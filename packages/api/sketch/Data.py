import tensorflow as tf
import pathlib
import numpy as np
from os import path, makedirs
from settings import IMG_WIDTH, IMG_HEIGHT, BATCH_SIZE, CLASS_NAMES
from sketch.ImageExtract import ImageExtract
import hashlib
import cv2
from lib.square_image import square_image
import shutil
import re

AUTOTUNE = tf.data.experimental.AUTOTUNE
DATA_DIR = pathlib.Path('./data')


class Data():

    def __init__(
        self,
        input_path: str = path.abspath(path.join(path.dirname(__file__), '../images')),
        out_path: str = path.abspath(path.join(path.dirname(__file__), '../data'))
    ):
        self.input_path = input_path
        self.out_path = out_path
        self.image_generator = tf.keras.preprocessing.image.ImageDataGenerator(
            # Settings to create extra modifications to images for extra data
            rescale=1./255,
            shear_range=0.1,
            zoom_range=0.1,
            rotation_range=10,
            width_shift_range=0.1,
            height_shift_range=0.1,
            horizontal_flip=True,
            vertical_flip=True,
            validation_split=0.2
        )

    def extractInputImages(self, types=CLASS_NAMES):
        """Loop over svg files in '../images/*.svg', and extract out to png"""
        canvases = []
        images = {}
        strokeMin = 4
        strokeMax = 14
        trainAmount = 0.8

        # Attempt to extract an svg file
        def extract(filename: str, type: str):
            ie = ImageExtract(filename)
            extracted = ie.extract()
            if images.get(type) is None: images[type] = []

            if (extracted is not None):
                print("\tGenerated {} images from {}".format(
                    len(extracted), filename))
                images[type] = np.concatenate(
                    (images[type], extracted[:, 0]))
                canvases.append(ie.canvas)
            else:
                print("\tNo shapes found for {}".format(filename))

        for type in types:
            print("Reading image '{}/{}'".format(self.input_path, type))
            original = '{}/{}.svg'.format(self.input_path, type)
            for i in range(strokeMin, strokeMax + 1):
                fn = self.__augmentSVGStroke__(original, type, i)
                extract(fn, type)

        for type, imgs in images.items():
            train_size = int(len(imgs) * trainAmount)
            train = imgs[:train_size]
            test = imgs[train_size:]

            self.__save('train', train, type)
            self.__save('test', test, type)

        print("Generated {} images".format(sum(map(lambda a: len(a), images.values()))))

    def __augmentSVGStroke__(self, fileName: str, type: str, size: int) -> str:
        newFile = '/tmp/sketch/{}-{}.svg'.format(type, size)
        makedirs(path.dirname(newFile), exist_ok=True)
        # shutil.copy2(fileName, newFile)

        with open(fileName) as f:
            content = f.read()

        with open(newFile, "w") as f:
            f.write(re.sub(
                'stroke-width="4"',
                'stroke-width="{}"'.format(size),
                content,
                flags=re.M
            ))
        return newFile


    def __save(
        self,
        type: str,
        imgs,
        classification: str,
        size: int = IMG_WIDTH,
        flipH: bool = True,
        flipV: bool = True
    ):
        """Save images to disk as either test or training data"""

        if (type not in ('test', 'train')):
            raise Exception("argument 'type' should be 'test' or 'train'")

        pathlib.Path(
            path.abspath(path.join(self.out_path, type, classification))
        ).mkdir(parents=True, exist_ok=True)

        list(map(lambda img: self.__save_img__(
            type, img, classification, size), imgs)
        )

    def __save_img__(self, type, img, classification: str, size):
        """Save image to disk"""
        hash = hashlib.md5(img).hexdigest()
        filename = path.abspath(path.join(
            path.dirname(__file__), '../data/{}/{}/{}.jpg'.format(type, classification, hash)))

        cv2.imwrite(filename, square_image(img, size))

    def __getData(self, type: str, subset=None):
        """Retrieve a subsection of data"""
        return self.image_generator.flow_from_directory(
            directory=path.join('./', str(DATA_DIR), type),
            batch_size=BATCH_SIZE,
            shuffle=True,
            target_size=(IMG_HEIGHT, IMG_WIDTH),
            classes=list(CLASS_NAMES),
            class_mode="categorical",
            color_mode="grayscale",
            subset=subset,
        )

    def load(self):
        """Load training and testing data from extracted images"""
        self.train_generator, self.validation_generator, self.test_generator = (
            self.__getData('train', 'training'),
            self.__getData('train', 'validation'),
            self.__getData('test')
        )

        self.STEP_SIZE_TRAIN = self.train_generator.n // self.train_generator.batch_size
        self.STEP_SIZE_TEST = self.test_generator.n // self.test_generator.batch_size
        self.STEP_SIZE_VALDATION = self.validation_generator.n // self.validation_generator.batch_size

        self.test_labels = None
        self.test_images = None

        batch_index = 0

        while batch_index <= self.test_generator.batch_index:
            data = self.test_generator.next()
            if (self.test_labels is None):
                self.test_labels = np.array(data[1])
                self.test_images = np.array(data[0])
            else:
                np.concatenate((self.test_images, data[0]))
                np.concatenate((self.test_labels, data[1]))

            batch_index = batch_index + 1

        return (self.train_generator, self.validation_generator, self.test_generator)
