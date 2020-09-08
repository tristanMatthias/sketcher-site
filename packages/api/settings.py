import pathlib
import numpy as np
import os

# CV2 data
IMG_WIDTH = 128
IMG_HEIGHT = IMG_WIDTH
CHANNELS = 1

# Tensorflow data
EPOCHS = 20
BATCH_SIZE = 32

ROOT_DIR = os.path.dirname(os.path.realpath(__file__))
TRAIN_DIR = pathlib.Path(os.path.join(ROOT_DIR, './data/train'))
INPUT_DIR = pathlib.Path(os.path.join(ROOT_DIR, './input'))
MODEL_PATH = pathlib.Path(os.path.join(ROOT_DIR, 'model.h5'))
CLASS_NAMES = [
    'button',
    'circle_image',
    'image',
    'input',
    'text',
    'select'
]
