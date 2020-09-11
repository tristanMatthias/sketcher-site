import cherrypy
import cherrypy_cors
import os
from sketch.Parse import ImageParser


UPLOAD_DIR = os.path.abspath('./uploads')
cherrypy_cors.install()

config = {
    'global': {
        'server.socket_host': '0.0.0.0',
        'server.socket_port': int(os.environ.get('PORT') or 5000),
        'cors.expose.on': True,
    }
}


class Sketch:
    def __init__(self):
        self.parser = ImageParser()

    @cherrypy.expose
    @cherrypy.tools.json_out()
    def extract(self, file):

        upload_file = os.path.normpath(os.path.join(UPLOAD_DIR, file.filename))
        size = 0
        with open(upload_file, 'wb') as out:
            while True:
                data = file.file.read(8192)
                if not data:
                    break
                out.write(data)
                size += len(data)

        return self.parser.parse(upload_file)


if __name__ == '__main__':
    cherrypy.quickstart(Sketch(), '/', config)
