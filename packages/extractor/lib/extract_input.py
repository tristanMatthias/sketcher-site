import os
from classes.ImageExtract import ImageExtract
from classes.Saver import Saver
import matplotlib.pyplot as plt
from settings import INPUT_TYPES
import numpy as np
import pathlib

dir_path = os.path.dirname(os.path.abspath(os.path.join(
    os.path.realpath(__file__), '../')))
s = Saver()


def extract(types=INPUT_TYPES):
    canvases = []
    images = {}

    for type in types:
        DIR = pathlib.Path("{}/{}".format(dir_path, 'input/{}'.format(type)))
        files = np.array(
            [item.name for item in DIR.glob('*') if item.name != ".DS_Store"])
        print('Extracting {} ({} files)'.format(type, len(files)))

        images[type] = np.array([])

        for f in files:
            filename = "{}/{}".format(dir_path, 'input/{}/{}'.format(type, f))
            ie = ImageExtract(filename)
            extracted = ie.extract()

            if (extracted is not None):
                print("\tFound {} shapes for {}".format(
                    len(extracted), filename))
                images[type] = np.concatenate((images[type], extracted[:, 0]))
                canvases.append(ie.canvas)
            else:
                print("\tNo shapes found for {}".format(filename))

        print("Total images for {}: {}".format(type, len(images[type])))

    for type, imgs in images.items():
        train_size = int(len(imgs) * 0.8)
        train = imgs[:train_size]
        test = imgs[train_size:]

        s.save('train', train, type)
        s.save('test', test, type)

    def draw():
        def drawImg(i, img):
            plt.subplot(1, 1, i+1)
            plt.imshow(img, cmap="gray")
            plt.xticks([]), plt.yticks([])

        [drawImg(i, img) for i, img in enumerate(images)]

        plt.show()
