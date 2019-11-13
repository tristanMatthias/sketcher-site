import tensorflow as tf
import pathlib
import numpy as np
import os
from settings import IMG_WIDTH, IMG_HEIGHT, BATCH_SIZE, CLASS_NAMES

AUTOTUNE = tf.data.experimental.AUTOTUNE
DATA_DIR = pathlib.Path('./data')


image_generator = tf.keras.preprocessing.image.ImageDataGenerator(
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


def getData(type, subset=None):
    return image_generator.flow_from_directory(
        directory=os.path.join('./', str(DATA_DIR), type),
        batch_size=BATCH_SIZE,
        shuffle=True,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        classes=list(CLASS_NAMES),
        class_mode="categorical",
        color_mode="grayscale",
        subset=subset,
    )


def load():
    return (
        getData('train', 'training'),
        getData('train', 'validation'),
        getData('test')
    )
