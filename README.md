# p5js-transfer-learning-supercollider

This is an example of how to combine [ml5js](https://ml5js.org/), [p5js](https://p5js.org/) and [SuperCollider](https://supercollider.github.io/).
Ii uses an express-server and [socket.io/](https://socket.io/) to listen for messages from the p5js-sketch.
The sketch uses [ml5js](https://ml5js.org/) applying transfer-learning for classification of the content of your webcam.
The predicted class is send to the server.
The server uses [osc](https://www.npmjs.com/package/osc) to send the predicted class to SuperCollider.

The idea is to make it possible to use [p5js](https://p5js.org/) and machine learning ([ml5js](https://ml5js.org/)) to trigger different sounds played via [SuperCollider](https://supercollider.github.io/)

## Installation

1. Install [SuperCollider](https://supercollider.github.io/)
2. Install [nodejs](https://nodejs.org/en)
3. Run ``node install``

## Usage

1. Start SuperCollider and open ``sc/firework.scd``,
2. Boot the SuperCollider server by executing the first line, i.e. ``s.boot``
3. Execute the first and last code block to add the Synth and to listen to incoming OSC messages
4. Run ``node socketServer.js`` to start the express webserver and to establish the websocket connections
5. Go to ``http://localhost:3000/``
6. Gather data for your two classes by clicking the buttons ``class1`` and ``class2``
7. Train, i.e. fine-tune the model by clicking ``train``.
8. After training the the p5js-sketch sends the prediction to the webserver which sends the message to SuperCollider.
