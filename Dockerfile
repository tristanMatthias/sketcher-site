FROM tensorflow/tensorflow:latest-py3
# FROM nikolaik/python-nodejs:python3.6-nodejs13-alpine

ENV PORT=4000
ENV NODE_ENV=production
WORKDIR /app

# ----------------------------------------------------------------- Installation
# Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# Node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
# Install APT libraries
RUN apt-get update;
RUN apt-get install -y libsm6 libxext6 libxrender-dev nodejs yarn libcairo2
# Pip
RUN pip3 install opencv-python imutils cairosvg matplotlib flask

# Yarn/node packages setup
COPY ./yarn.lock .
COPY ./package.json .
COPY ./lerna.json .
COPY ./packages/api/package.json /app/packages/api/package.json
COPY ./packages/extractor/package.json /app/packages/extractor/package.json

RUN yarn --build-from-source
RUN yarn lerna bootstrap; yarn lerna link

# -------------------------------------------------------------------- Copy dist
COPY ./packages/extractor /app/packages/extractor
COPY ./packages/api/dist /app/packages/api/dist
COPY ./packages/api/.env ./.env

# ---------------------------------------------------------------------- Running
EXPOSE 4000
EXPOSE 443
CMD [ "yarn", "concurrently", "\"node packages/api/dist\"", "\"python packages/extractor/server.py\""]
