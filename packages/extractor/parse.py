#!/usr/local/bin/python3
import argparse
from lib.parse import parse
import json

# def draw():
#     def drawImg(i, img):
#         plt.subplot(1, len(images), i+1)
#         plt.imshow(img, cmap="gray")
#         plt.xticks([]), plt.yticks([])

#     [drawImg(i, img[0, :, :, 0]) for i, img in enumerate(images)]

#     plt.show()


# draw()

parser = argparse.ArgumentParser(
    description='Detect elements in a wireframe image'
)
parser.add_argument('input', nargs=1)
ns = parser.parse_args()

data = parse(ns.input[0])
print(json.dumps(data, indent=2, sort_keys=True))
