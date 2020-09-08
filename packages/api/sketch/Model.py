from __future__ import absolute_import, division, print_function, unicode_literals

import os

from sketch import Data
import tensorflow as tf
from tensorflow import keras
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, Dropout, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import math
import matplotlib.pyplot as plt
from settings import IMG_WIDTH, IMG_HEIGHT, CHANNELS, EPOCHS, MODEL_PATH, CLASS_NAMES


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


class Model():
    def __init__(self):
        self.model = self.__create_model__()

    def __create_model__(self):
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

    def train(self, data: Data, epochs: int):
        self.history = self.model.fit_generator(
            generator=data.train_generator,
            steps_per_epoch=data.STEP_SIZE_TRAIN,
            validation_data=data.validation_generator,
            validation_steps=data.STEP_SIZE_VALDATION,
            epochs=epochs
        )

        test_loss, test_accuracy = self.model.evaluate(
            data.test_generator, steps=data.STEP_SIZE_TEST
        )
        print('Accuracy on test dataset:', test_accuracy)
        self.predictions = self.model.predict_generator(
            data.test_generator,
            steps=data.STEP_SIZE_TEST
        )

        self.model.save(MODEL_PATH)

        return self.predictions
