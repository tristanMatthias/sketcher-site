generate:
	python3 generate-data.py
train:
	python3 train.py
start:
	python3 server.py
build:
	docker build -t sketch_site ./
js-model:
	tensorflowjs_converter --input_format keras \
                       model.h5 \
                       tfjs_model/
run:
	docker run -p "5000:5000" sketch_site
