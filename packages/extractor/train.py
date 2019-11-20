from __future__ import absolute_import, division, print_function, unicode_literals

import os

import lib.data as data
import lib.plot as plot
import tensorflow as tf
from tensorflow import keras
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, Dropout, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import math
import matplotlib.pyplot as plt
from settings import IMG_WIDTH, IMG_HEIGHT, CHANNELS, EPOCHS, MODEL_PATH, CLASS_NAMES
import argparse


parser = argparse.ArgumentParser(
    description='Train model'
)
parser.add_argument('epochs', nargs='?', default=EPOCHS)
args = parser.parse_args()
epochs = int(args.epochs)
print('Training for', args.epochs, "epoch")

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


train_generator, validation_generator, test_generator = data.load()
STEP_SIZE_TRAIN = train_generator.n//train_generator.batch_size
STEP_SIZE_TEST = test_generator.n//test_generator.batch_size
STEP_SIZE_VALDATION = validation_generator.n//validation_generator.batch_size

test_labels = None
test_images = None

batch_index = 0

while batch_index <= test_generator.batch_index:
    data = test_generator.next()
    if (test_labels is None):
        test_labels = np.array(data[1])
        test_images = np.array(data[0])
    else:
        np.concatenate((test_images, data[0]))
        np.concatenate((test_labels, data[1]))

    batch_index = batch_index + 1


def create_model():
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        return model
    except:
        pass

    model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(
            32, (3, 3), padding='same',
            activation=tf.nn.relu, input_shape=(IMG_WIDTH, IMG_HEIGHT, 1)),
        tf.keras.layers.MaxPooling2D((2, 2), strides=2),
        tf.keras.layers.Conv2D(
            64, (3, 3), padding='same', activation=tf.nn.relu),
        tf.keras.layers.MaxPooling2D((2, 2), strides=2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation=tf.nn.relu),
        tf.keras.layers.Dense(len(CLASS_NAMES), activation=tf.nn.softmax)
    ])

    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    return model


model = create_model()

history = model.fit_generator(
    generator=train_generator,
    steps_per_epoch=STEP_SIZE_TRAIN,
    validation_data=validation_generator,
    validation_steps=STEP_SIZE_VALDATION,
    epochs=epochs
)

test_loss, test_accuracy = model.evaluate(
    test_generator, steps=STEP_SIZE_TEST
)
print('Accuracy on test dataset:', test_accuracy)


def plot_accuracy():
    acc = history.history['accuracy']
    val_acc = history.history['val_accuracy']

    loss = history.history['loss']
    val_loss = history.history['val_loss']

    epochs_range = range(epochs)

    plt.figure(figsize=(8, 8))
    plt.subplot(1, 2, 1)
    plt.plot(epochs_range, acc, label='Training Accuracy')
    plt.plot(epochs_range, val_acc, label='Validation Accuracy')
    plt.legend(loc='lower right')
    plt.title('Training and Validation Accuracy')

    plt.subplot(1, 2, 2)
    plt.plot(epochs_range, loss, label='Training Loss')
    plt.plot(epochs_range, val_loss, label='Validation Loss')
    plt.legend(loc='upper right')
    plt.title('Training and Validation Loss')
    # plt.show()


predictions = model.predict_generator(test_generator, steps=STEP_SIZE_TEST)


plot_accuracy()

plot.plot_results(
    CLASS_NAMES,
    predictions,
    test_labels,
    test_images
)


model.save(MODEL_PATH)
