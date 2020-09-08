import argparse

from sketch.Data import Data
from sketch.Model import Model
import settings as defaults

data = Data()
# Generate image training data from ./images/*.svg
data.extractInputImages(types=defaults.CLASS_NAMES)
