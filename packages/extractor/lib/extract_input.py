import os
from classes.ImageExtract import ImageExtract
from classes.Saver import Saver
import matplotlib.pyplot as plt
from settings import INPUT_TYPES

dir_path = os.path.dirname(os.path.abspath(os.path.join(
    os.path.realpath(__file__), '../')))
s = Saver()


def extract(types=INPUT_TYPES):
    canvases = []
    images = {}

    for type in types:
        print('Extracting {}'.format(type))
        filename = "{}/{}".format(
            dir_path,
            'input/{}/{}.svg'.format(type, type)
        )
        ie = ImageExtract(filename)
        images[type] = ie.extract()[:, 0]
        canvases.append(ie.canvas)

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
