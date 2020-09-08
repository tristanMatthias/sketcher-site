import os
from sketch.ImageExtract import ImageExtract
from lib.square_image import square_image
from settings import IMG_WIDTH, MODEL_PATH, CLASS_NAMES
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import cv2

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
COLS = 6

class ImageParser():
    def __init__(self):
        self.model = tf.keras.models.load_model(MODEL_PATH)

    def __prepare_img(self, img):
        i = square_image(img, IMG_WIDTH)
        i = np.array(i, dtype=np.float64)
        i /= 255
        i = i.reshape(-1, IMG_WIDTH, IMG_WIDTH, 1)

        return i


    def parse(self, img: str, plot=False):
        """Take an image, and extract components (predictions) and bounding boxes"""
        extractor = ImageExtract(img)
        extracted = extractor.extract(plot=True)

        # Handle no determinable shapes
        if (extracted is None or len(extracted) == 0):
            print('[]')
            exit()

        images = extracted[:, 0]
        images = list(map(self.__prepare_img, images))


        predictions = list(map(lambda i: self.model.predict_classes(i)[0], images))
        predictions = list(map(lambda p: CLASS_NAMES[p], predictions))

        data = []
        height, width, _ = extractor.image.shape
        height -= 40 # Minus padding
        width -= 40 # Minus padding

        colSize = round(width / COLS)

        fig = None
        if plot:
            fig = plt.figure(figsize=(1, len(images)))

            fig.add_subplot(1, len(images) + 2, 1)
            plt.imshow(extractor.canvas)

            fig.add_subplot(1, len(images) + 2, 2)
            plt.imshow(extractor.blur)


        for i, e in enumerate(extracted):
            img, rec, bbox = e
            center = rec[0]
            x, y, w, h = bbox
            print(x,w, width)
            x = round((x - 20) / width * COLS)
            w = round(w/width * COLS)

            data.append({
                "component": predictions[i],
                "center": [center[0], center[1]],
                "box": {
                    "x": x,
                    "y": y,
                    "w": w,
                    "h": h
                }
            })

            if plot:
                _img = square_image(img, IMG_WIDTH)
                fig.add_subplot(1, len(images) + 2, i + 3)
                plt.imshow(_img)

        if plot:
            plt.show()

        return data
