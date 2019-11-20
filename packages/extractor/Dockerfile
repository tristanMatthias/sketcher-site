FROM tensorflow/tensorflow:latest-py3
WORKDIR /app
ENV FLASK_APP=/app/server.py

# ----------------------------------------------------------------- Installation
# RUN apt-get install -y libsm6 libxext6 libxrender-dev

# RUN echo "# Google IPv4 nameservers nameserver 8.8.8.8 \
#   nameserver 8.8.4.4" >> /etc/resolv.conf
# RUN mkdir -p /etc/dhcp/
# RUN echo "prepend domain-name-servers 8.8.8.8, 8.8.4.4;" > /etc/dhcp/dhclient.conf
# RUN cat /etc/resolv.conf
RUN apt-get install -y libcairo2
RUN pip3 install opencv-python imutils cairosvg matplotlib flask

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install -y libsm6 libxext6 libxrender-dev


# -------------------------------------------------------------------- Copy dist
COPY . .

RUN pwd
RUN ls -al

# COPY ./packages/extractor /app/packages/extractor
# COPY ./packages/api/dist /app/packages/api/dist
# COPY ./packages/api/.env ./.env


# ---------------------------------------------------------------------- Running
EXPOSE 5000
CMD [ "flask", "run", "--host", "0.0.0.0"]
