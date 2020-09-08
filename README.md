# [Sketcher.site](https://sketcher.site)
This project is an experimental attempt to generate simple html from sketches.

It uses a React front end, a Python (CherryPy) API, and a Tensorflow CNN with OpenCV.

## Requirements
- Node.js
- Python3

## Setup
### API
1. Install the dependencies with:
   ```
   cd packages/api;
   pip3 install -r requirements.txt
   ```
2. Generate training data with:
   ```
   make generate
   ```
3. Train the model with:
   ```
   make train
   ```

    Or if you want to pass a custom epoch:

   ```
   python3 train.py EPOCH_NUM
   ```
4. Run the server with
   ```
   make start
   ```

The API also uses Docker, which can be built and run with:
```
make build;
make run;
open http://localhost:5000/ # Should give a 404
```

---

### Client (Front end)
1. Install dependencies with:
   ```
   yarn
   ```
2. Run the local server with:
   ```
   yarn dev
   ```
3. Open the site at: `http://localhost:8080/`
