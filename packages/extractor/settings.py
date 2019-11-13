import pathlib
import numpy as np
import os

IMG_WIDTH = 128
IMG_HEIGHT = IMG_WIDTH
CHANNELS = 1

EPOCHS = 10
BATCH_SIZE = 32
ROOT_DIR = os.path.dirname(os.path.realpath(__file__))
TRAIN_DIR = pathlib.Path(os.path.join(ROOT_DIR, './data/train'))
INPUT_DIR = pathlib.Path(os.path.join(ROOT_DIR, './input'))
MODEL_PATH = pathlib.Path(os.path.join(ROOT_DIR, 'model.h5'))


CLASS_NAMES = np.array(
    [item.name for item in TRAIN_DIR.glob('*') if item.name != ".DS_Store"])

INPUT_TYPES = np.array(
    [item.name for item in INPUT_DIR.glob('*') if item.name != ".DS_Store"])
