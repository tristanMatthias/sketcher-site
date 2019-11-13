import pathlib
import os
import cv2
import hashlib
from lib.square_image import square_image
dir_path = os.path.dirname(os.path.realpath(__file__))
output = os.path.join(os.path.dirname(__file__), '../data')


class Saver():

    def save(
        self,
        type,
        imgs,
        classification: str,
        size=150,
        flipH=True,
        flipV=True
    ):
        if (type not in ('test', 'train')):
            raise Exception("argument 'type' should be 'test' or 'train'")

        pathlib.Path(
            os.path.abspath(os.path.join(output, type, classification))
        ).mkdir(parents=True, exist_ok=True)

        list(map(lambda img: self.__save_img__(
            type, img, classification, size), imgs)
        )

    def __save_img__(self, type, img, classification: str, size):
        hash = hashlib.md5(img).hexdigest()
        filename = os.path.abspath(os.path.join(
            os.path.dirname(__file__), '../data/{}/{}/{}.jpg'.format(type, classification, hash)))

        cv2.imwrite(filename, square_image(img, size))
