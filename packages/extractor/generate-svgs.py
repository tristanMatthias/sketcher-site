from settings import CLASS_NAMES
import os
import re
import pathlib


def write(file, c, size):
    pathlib.Path(
        os.path.abspath('./input/{}'.format(c))
    ).mkdir(parents=True, exist_ok=True)

    f = open('./input/{}/{}-{}.svg'.format(c, c, size), 'w+')
    p = re.compile('stroke-width=".*"')

    f.write(p.sub('stroke-width="{}" fill="none"'.format(size), file))
    f.close()


for c in CLASS_NAMES:
    f = open(os.path.abspath('./input/{}-10.svg'.format(c)))
    file = f.read()
    f.close()

    for i in range(10, 2, -1):
        write(file, c, str(i))
