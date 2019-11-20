FROM tensorflow/tensorflow:latest-py3
# FROM nikolaik/python-nodejs:python3.6-nodejs13-alpine

ENV NODE_ENV=production
WORKDIR /app

# ----------------------------------------------------------------- Installation
# RUN apk add --no-cache bash make g++ build-base
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update; apt-get install -y nodejs yarn
RUN apt-get install -y libsm6 libxext6 libxrender-dev


COPY ./yarn.lock .
COPY ./package.json .
COPY ./lerna.json .
COPY ./packages/api/package.json /app/packages/api/package.json
COPY ./packages/extractor/package.json /app/packages/extractor/package.json

RUN yarn --build-from-source
RUN yarn lerna bootstrap; yarn lerna link
RUN pip3 install opencv-python imutils cairosvg matplotlib flask
RUN apt-get install -y libcairo2
RUN yarn global add pm2

# -------------------------------------------------------------------- Copy dist
COPY ./pm2.config.js /app/pm2.config.js
COPY ./packages/extractor /app/packages/extractor
COPY ./packages/api/dist /app/packages/api/dist
COPY ./packages/api/.env ./.env

# ---------------------------------------------------------------------- Running
EXPOSE 4000
EXPOSE 443
CMD ["pm2-runtime", "pm2.config.js"]
