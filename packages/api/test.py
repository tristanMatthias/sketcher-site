import argparse

from sketch.ImageExtract import ImageExtract
from sketch.Parse import ImageParser
import matplotlib.pyplot as plt
import cv2

import argparse

parser = argparse.ArgumentParser(
    description='Extract components from image for data')
parser.add_argument('file')
args = parser.parse_args()


p = ImageParser()
p.parse(args.file, plot=True)


# img = cv2.imread(args.file)
# invert = cv2.bitwise_not(img)

# kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
# dilate = cv2.dilate(invert, kernel, iterations=2)

# plt.imshow(dilate)
# plt.show()
