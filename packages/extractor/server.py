#!/usr/bin/python

import os
from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename
from lib.parse import parse
import json

UPLOAD_FOLDER = os.path.abspath('./uploads')
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    print(request.files)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        fp = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(fp)

        return tuple(parse(fp))

    return 'No file'


@app.route('/parse', methods=['POST'])
def parse_file():
    content = request.json
    file = content['file']
    res = parse(file)
    print(res)
    return json.dumps(res, indent=2, sort_keys=True)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5555, debug=True, threaded=True)
