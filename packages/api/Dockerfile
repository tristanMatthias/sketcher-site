FROM tensorflow/tensorflow:nightly-py3

WORKDIR /app


# ----------------------------------------------------------------- Install deps
RUN pip3 install opencv-python imutils cairosvg matplotlib cherrypy cherrypy_cors
# OpenCV deps
RUN apt-get update
RUN apt-get install -y libsm6 libxext6 libxrender-dev libcairo2 ffmpeg


# ------------------------------------------------------------------- Copy files
COPY model.h5 model.h5
COPY *.py /app/
COPY sketch/ sketch/
COPY lib/ lib/
run mkdir uploads/

# ---------------------------------------------------------------------- Running
EXPOSE 5000
CMD [ "python3", "server.py" ]
