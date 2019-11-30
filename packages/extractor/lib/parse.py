import os
from classes.ImageExtract import ImageExtract
from lib.square_image import square_image
from settings import IMG_WIDTH, MODEL_PATH, CLASS_NAMES
import numpy as np
import tensorflow as tf

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
COLS = 12


def parse(img):
    extractor = ImageExtract(img)
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
    height, width, _ = extractor.image.shape
    colSize = round(width / COLS)

    for i, e in enumerate(extracted):
        img, rec, bbox = e
        center = rec[0]
        x, y, w, h = bbox
        x = round(x/width * COLS)
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

    return data
