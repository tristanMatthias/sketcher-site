import cv2
from settings import IMG_WIDTH


def square_image(img, size=IMG_WIDTH):
    # Resize image to standard size
    height, width = img.shape[:2]
    if (height > width):
        borderH = int((height - width) / 2)
        borderV = 0
    else:
        borderV = int((width - height) / 2)
        borderH = 0

    padding = int(max(width, height) * 0.1)
    borderH += padding
    borderV += padding

    img = cv2.copyMakeBorder(
        img, borderV, borderV, borderH, borderH, cv2.BORDER_CONSTANT, value=255)

    return cv2.resize(img, (size, size))
