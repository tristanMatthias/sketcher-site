#!/usr/local/bin/python3

from settings import MODEL_PATH
import os
from lib.extract_input import extractForYolo
import cv2
import hashlib
from settings import CLASS_NAMES, ROOT_DIR
import pathlib
import numpy as np


def extract(imagePath, classification):
    print("\tExtracting", imagePath)
    img, lines = extractForYolo(imagePath, classification)

    hash = hashlib.md5(img).hexdigest()

    filename = os.path.abspath(os.path.join(
        os.path.dirname(__file__), 'darknet-data/{}_{}.jpg'.format(classification, hash)))

    cv2.imwrite(filename, img)
    f = open(os.path.join(
        os.path.dirname(__file__),
        'darknet-data/{}_{}.txt'.format(classification, hash)), "w+"
    )
    for l in lines:
        f.write('{} {} {} {} {}\n'.format(
            l[0], l[1][0], l[1][1], l[2][0], l[2][1]))
    f.close()


for c in CLASS_NAMES:
    print(c)
    dir = pathlib.Path(os.path.join(
        ROOT_DIR, './input/{}'.format(c)))
    images = np.array(
        [item.name for item in dir.glob('*') if item.name != ".DS_Store"])
    for i in images:
        extract(os.path.join(dir, i), c)
