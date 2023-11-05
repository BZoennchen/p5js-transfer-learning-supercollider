# p5js-transfer-learning-supercollider

This is an example of how to combine [ml5js](https://ml5js.org/), [p5js](https://p5js.org/) and [SuperCollider](https://supercollider.github.io/).
I use an express-server and [socket.io/](https://socket.io/) to listen for messages from the p5js-sketch.
The sketch uses [ml5js](https://ml5js.org/) applying transfer-learning for classification of the content of your webcam.
The predicted class is send to the server.
The server uses [osc](https://www.npmjs.com/package/osc) to send the predicted class to SuperCollider.

The idea is to make it possible to use [p5js](https://p5js.org/) and machine learning ([ml5js](https://ml5js.org/)) to trigger different sounds played via [SuperCollider](https://supercollider.github.io/)
