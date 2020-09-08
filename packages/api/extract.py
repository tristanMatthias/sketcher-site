import argparse

from sketch.Parse import ImageParser

import argparse

parser = argparse.ArgumentParser(
    description='Extract components from image for data')
parser.add_argument('file')
args = parser.parse_args()


parser = ImageParser()
print(parser.parse(args.file))
