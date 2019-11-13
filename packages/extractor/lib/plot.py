import matplotlib.pyplot as plt
import numpy as np
import cv2
from settings import IMG_WIDTH, IMG_HEIGHT


def plot_results(
    class_names,
    predictions,
    test_labels,
    test_images,
    rows=4,
    cols=8
):

    def plot_image(i, predictions_array, true_array, img):
        predictions_array, true_array, img = predictions_array, true_array[i], img[i]

        plt.grid(False)
        plt.xticks([])
        plt.yticks([])

        plt.imshow(img.reshape(IMG_WIDTH, IMG_HEIGHT), cmap=plt.cm.gray)

        predicted_label = np.argmax(predictions_array)
        true_label = np.argmax(true_array)

        if predicted_label == true_label:
            color = 'blue'
        else:
            color = 'red'

        plt.xlabel("{} {:2.0f}% ({})".format(
            class_names[predicted_label],
            100*np.max(predictions_array),
            class_names[true_label]),
            color=color
        )

    def plot_value_array(i, predictions_array, true_array):
        predictions_array, true_array = predictions_array, true_array[i]

        plt.grid(False)
        plt.xticks(range(len(predictions_array)))
        plt.yticks([])
        thisplot = plt.bar(
            range(len(predictions_array)),
            predictions_array,
            color="#777777"
        )
        plt.ylim([0, 1])
        predicted_label = np.argmax(predictions_array)
        true_label = np.argmax(true_array)

        thisplot[predicted_label].set_color('red')
        thisplot[true_label].set_color('blue')

    num_images = rows*cols
    plt.figure(figsize=(2*2*cols, 2*rows))
    for i in range(num_images):
        plt.subplot(rows, 2*cols, 2*i+1)
        plot_image(i, predictions[i], test_labels, test_images)
        plt.subplot(rows, 2*cols, 2*i+2)
        plot_value_array(i, predictions[i], test_labels)
    plt.tight_layout()
    plt.show()
