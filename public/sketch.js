let mobilenet;
let video;
let label = 'prediction';
let classifier;
let class1Button;
let class2Button;
let trainButton;
let socket;

const SERVER_PORT = 3000;

function sendMessage(label) {
	let data = {
		label: label,
	}
	socket.emit('sendMessage', data);
}

function modelReady() {
	console.log('Model is ready!!!');
}

function videoReady() { 
	console.log('Video is ready!!!');
}

function whileTraining(loss) { 
	if (loss == null) {
		console.log("training complete");
		classifier.classify(gotResults);
	} else { 
		console.log(loss)
	}
}

function gotResults(error, results) { 
	if (error) {
		console.error(error);
	} else { 
		console.log(results);
		label = results[0].label;
		sendMessage(label);
		classifier.classify(gotResults);
	}
}

function setup() {
	socket = io.connect('http://localhost:'+SERVER_PORT);
	createCanvas(700, 500);
	video = createCapture(VIDEO);
	video.hide();
	
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(video, videoReady);
	
	class1Button = createButton('class1');
	class2Button = createButton('class2');
	trainButton = createButton('train');
	
	class1Button.mousePressed(function () {
		classifier.addImage('class1');
	});

	class2Button.mousePressed(function () {
		classifier.addImage('class2');
	});

	trainButton.mousePressed(function () {
		classifier.train(whileTraining);
	});
}

function draw() {
	background(0);
	image(video, 0, 0);

	fill(255);
	stroke(255);
	textSize(64);
	text(label, 10, height - 200);
}
