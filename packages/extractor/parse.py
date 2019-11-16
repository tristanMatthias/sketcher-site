#!/usr/local/bin/python3

from settings import MODEL_PATH
import tensorflow as tf
import argparse
import os
from classes.ImageExtract import ImageExtract
from lib.square_image import square_image
import matplotlib.pyplot as plt
from settings import IMG_WIDTH, CLASS_NAMES
import numpy as np
# import tensorflow.python.util.deprecation as deprecation
import json


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# deprecation._PRINT_DEPRECATION_WARNINGS = False


parser = argparse.ArgumentParser(
    description='Detect elements in a wireframe image'
)
parser.add_argument('input', nargs=1)
ns = parser.parse_args()

extractor = ImageExtract(ns.input[0])
extracted = extractor.extract()

# Handle no determinable shapes
if (extracted is None or len(extracted) == 0):
    print('[]')
    exit()


images = extracted[:, 0]


def prepare_img(img):
    i = square_image(img, IMG_WIDTH)
    i = np.array(i, dtype=np.float64)
    i /= 255
    i = i.reshape(-1, IMG_WIDTH, IMG_WIDTH, 1)

    return i


images = list(map(prepare_img, images))

model = tf.keras.models.load_model(MODEL_PATH)
predictions = list(map(lambda i: model.predict_classes(i)[0], images))
predictions = list(map(lambda p: CLASS_NAMES[p], predictions))

data = []

for i, e in enumerate(extracted):
    img, rec, bbox = e
    center = rec[0]
    x, y, w, h = bbox

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

print(json.dumps(data, indent=2, sort_keys=True))


# def draw():
#     def drawImg(i, img):
#         plt.subplot(1, len(images), i+1)
#         plt.imshow(img, cmap="gray")
#         plt.xticks([]), plt.yticks([])

#     [drawImg(i, img[0, :, :, 0]) for i, img in enumerate(images)]

#     plt.show()


# draw()
