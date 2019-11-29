import cv2
import imutils
import numpy as np
from cairosvg import svg2png
from PIL import Image

import os

os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'


class ImageExtract():

    def __init__(self, filename=None, threshold=70):
        self.threshold = threshold
        if (filename):
            self.update(filename)

    def update(self, filename: str):
        if (str.endswith(filename, '.svg')):
            self.image = self.__svg2png(filename)
        else:
            self.image = cv2.imread(filename=filename)
        try:
            self.gray = cv2.cvtColor(src=self.image, code=cv2.COLOR_BGR2GRAY)
        except:
            print("SHIT", filename)
        self.canvas = self.image.copy()
        self.blur = cv2.GaussianBlur(src=self.gray, ksize=(5, 5), sigmaX=0)

    def extract(self, img=None):
        if img is None:
            img = self.blur

        extracted = None
        if (isinstance(img, str)):
            img = cv2.imread(filename=img)
            img = cv2.cvtColor(src=img, code=cv2.COLOR_BGR2GRAY)
            self.image = img

        # Convert image to binary
        (t, binary) = cv2.threshold(
            src=img,
            thresh=self.threshold,
            maxval=255,
            type=cv2.THRESH_BINARY)

        # Get shapes and hierarchy
        contours, hierarchy = cv2.findContours(
            image=binary,
            mode=cv2.RETR_TREE,
            method=cv2.CHAIN_APPROX_NONE)

        stack = []
        entries = []
        for i, c in enumerate(contours):
            # If the countour is top level, add to stack
            h = hierarchy[0][i]
            if (h[3] == 0):
                stack.append((c, h, cv2.boundingRect(c)))

        # Remove nested rectangles in the stack
        while (stack):
            nextItem = stack.pop()
            if (self.__findParent(nextItem, entries) is False):
                entries.append(nextItem)

        # Extract each shape, and draw to canvas
        for i, e in enumerate(entries):
            c, h, r = e
            # If the countour is top level, extract it
            if (h[3] == 0):
                rec = cv2.minAreaRect(c)
                box = cv2.boxPoints(rec)
                box = np.intp(box)

                item = [[self.__extract_rect(binary, rec), rec, r]]

                if (extracted is None):
                    extracted = np.array(item)
                else:
                    extracted = np.vstack((extracted, item))
                # extracted = [
                #     (self.__extract_rect(binary, rec), c, rec)
                # ] + extracted

                if hasattr(self, 'canvas'):
                    cv2.drawContours(
                        self.canvas,
                        [box],
                        0,
                        (0, 255, 0),
                        thickness=10
                    )

        return extracted

    # Extract rect

    def __extract_rect(self, img, rect):
        # get the parameter of the small rectangle
        center, size, angle = rect[0], rect[1], rect[2]
        center, size = tuple(map(int, center)), tuple(map(int, size))

        # get row and col num in img
        height, width = img.shape[0], img.shape[1]

        # calculate the rotation matrix
        M = cv2.getRotationMatrix2D(center, angle, 1)
        # rotate the original image
        img_rot = cv2.warpAffine(img, M, (width, height))

        # now rotated rectangle becomes vertical and we crop it
        img_crop = cv2.getRectSubPix(img_rot, size, center)
        if (angle < -45):
            img_crop = imutils.rotate_bound(img_crop, -90)

        return img_crop

    def __svg2png(self, filename: str):
        tmp = "/tmp/svg2png.png"
        svg2png(url=filename, write_to=tmp)
        im = Image.open(tmp)
        im = im.convert("RGBA")   # it had mode P after DL it from OP
        if im.mode in ('RGBA', 'LA'):
            background = Image.new(im.mode[:-1], im.size, (255, 255, 255))
            background.paste(im, im.split()[-1])  # omit transparency
            im = background

        tmp = "/tmp/png2jpg.jpg"
        im.convert("RGB").save(tmp)
        return cv2.imread(filename=tmp)

    def __findParent(self, rect, rects):
        x1, y1, w1, h1 = rect[2]

        def compare(possibleParent):
            x2, y2, w2, h2 = possibleParent
            if (
                x1 > x2
                and y1 > y2
                and x1 + w1 < x2 + w2
                and y1 + h1 < y2 + h2
            ):
                return possibleParent

        parent = any(compare(r[2]) for r in iter(rects))

        if parent:
            return True
        else:
            return False
