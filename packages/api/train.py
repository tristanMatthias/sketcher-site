from __future__ import absolute_import, division, print_function, unicode_literals

from sketch.Data import Data
from sketch.Model import Model
from sketch.Plot import Plot
from settings import EPOCHS, MODEL_PATH, CLASS_NAMES
import argparse
import os
import numpy as np
import matplotlib.pyplot as plt

parser = argparse.ArgumentParser(
    description='Train model'
)
parser.add_argument('epochs', nargs='?', default=EPOCHS)
args = parser.parse_args()
epochs = int(args.epochs)
print('Training for', args.epochs, "epoch")

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


data = Data()
data.load()

model = Model()
model.train(data, epochs)

plot = Plot(model, epochs)
plot.plot_accuracy()
plot.plot_results(
    CLASS_NAMES,
    data.test_labels,
    data.test_images
)


model.model.save(MODEL_PATH)
