# FROM tensorflow/tensorflow:latest-py3
# # FROM nikolaik/python-nodejs:python3.6-nodejs13-alpine

# ENV PORT=4000
# ENV NODE_ENV=production
# WORKDIR /app

# # ----------------------------------------------------------------- Installation
# # RUN apk add --no-cache bash make g++ build-base
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get update; apt-get install -y nodejs yarn
# RUN apt-get install -y libsm6 libxext6 libxrender-dev


# COPY ./yarn.lock .
# COPY ./package.json .
# COPY ./lerna.json .
# COPY ./packages/api/package.json /app/packages/api/package.json
# COPY ./packages/extractor/package.json /app/packages/extractor/package.json

# RUN yarn --build-from-source
# RUN yarn lerna bootstrap; yarn lerna link
# RUN pip3 install opencv-python imutils cairosvg matplotlib flask
# RUN apt-get install -y libcairo2
# RUN yarn add pm2 -W

# # -------------------------------------------------------------------- Copy dist
# COPY ./packages/extractor /app/packages/extractor
# COPY ./packages/api/dist /app/packages/api/dist
# COPY ./packages/api/.env ./.env
# COPY ./pm2.config.js /app/pm2.config.js
# RUN mkdir /.pm2; chmod -R a+rwX /.pm2
# # COPY ./run.sh ./run.sh

# # ---------------------------------------------------------------------- Running
# EXPOSE 4000
# EXPOSE 443
# CMD ["node", "packages/api/dist"]
# # CMD ["sh", "run.sh"]
# # CMD ["yarn", "start"]
# # CMD ["yarn", "pm2-runtime", "pm2.config.js"]


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


RUN echo "# Google IPv4 nameservers nameserver 8.8.8.8 \
  nameserver 8.8.4.4" >> /etc/resolv.conf
RUN mkdir -p /etc/dhcp/
RUN echo "prepend domain-name-servers 8.8.8.8, 8.8.4.4;" > /etc/dhcp/dhclient.conf
RUN cat /etc/resolv.conf
# RUN apt-get install libgtk2.1
RUN apt-get install -y libcairo2
RUN pip3 install opencv-python imutils cairosvg matplotlib flask


# -------------------------------------------------------------------- Copy dist
# RUN yarn add -W forever
COPY ./packages/extractor /app/packages/extractor
COPY ./packages/api/dist /app/packages/api/dist
COPY ./packages/api/.env ./.env

# ---------------------------------------------------------------------- Running
# RUN useradd -m sketcher
# # USER sketcher
# RUN chown -R sketcher:sketcher /app
# RUN chmod 755 /app
# USER sketcher


EXPOSE 4000
EXPOSE 443
# CMD [ "yarn", "forever", "start", "packages/api/dist"]
# CMD [ "yarn", "start"]
CMD [ "yarn", "concurrently", "\"node packages/api/dist\"", "\"python packages/extractor/server.py\""]
