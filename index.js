const Muse = require('muse-js') // this node.js style import needs to be browserified
// $ browserify index.js -o bundle.js
// This will bundle all of the necessary dependencies


const graphTitles = Array.from(document.querySelectorAll('.electrode-item h4'));

// hook onto and store the cavas div/ canvas context
const canvases = Array.from(document.querySelectorAll('.electrode-item canvas'));
const canvasCtx = canvases.map((canvas) => canvas.getContext('2d'));
const blinkStatus = document.querySelector('#blinkStatus');

const networkParams = {
  task: 'classification',
  debug: true,
  learningRate: .25,
  layers: [
    ml5.tf.layers.dense({
      units: 16,
      inputShape: [4],
      activation: 'relu',
    }),
    ml5.tf.layers.dense({
      units: 16,
      activation: 'relu',
    }),
    ml5.tf.layers.dense({
      units: 2,
      activation: 'sigmoid',
    })
  ],
  inputs: 4,
  outputs: 2,
  modelLoss: 'categoricalCrossentropy',
  modelOptimizer: 'adam',
}
const neuralNetwork = ml5.neuralNetwork(networkParams);
console.log(neuralNetwork)

var recording = false
var finishedTraining = false

window.record = function () {
  recording = true
}


var storedResults = [
  [],
  [],
  [],
  []
]

// for each 15 element array returned by the eegReading, adjust the appropriate canvas with a 
// histogram like plot
function plot(reading) {
  // identify the appropriate plot for the current electrode reading
  const canvas = canvases[reading.electrode];
  const context = canvasCtx[reading.electrode];

  // escape the function if the electrode is invalid
  if (!context) {
    return;
  }
  const width = canvas.width / 12.0;
  const height = canvas.height / 2.0;
  var color = "#4f837f"
  if (recording) {
    color = "#CDADFF"
  }
  context.fillStyle = color;
  context.clearRect(0, 0, canvas.width, canvas.height);

  // loop through each eeg reading (15 per array) and create a rectangle cooresponding
  // to the appropriate voltage
  for (let i = 0; i < reading.samples.length; i++) {
    const sample = reading.samples[i] / 10.;
    if (sample > 0) {
      context.fillRect(i * 25, height - sample, width, sample);
    } else {
      context.fillRect(i * 25, height, width, -sample);
    }
  }
}

let CalculateRMS = function (arr) {

  // calculate the root mean squared of an array

  let Squares = arr.map((val) => (val * val));
  let Sum = Squares.reduce((acum, val) => (acum + val));

  Mean = Sum / arr.length;
  return Math.sqrt(Mean);
}

async function main() {

  // initiate the web-bluetooth conection request

  let client = new Muse.MuseClient();
  await client.connect();
  await client.start();

  client.eegReadings.subscribe(reading => {
    plot(reading);
    graphTitles[reading.electrode].textContent = CalculateRMS(reading.samples).toString()
    if (reading.electrode === 0) {
      if (Math.max.apply(null, reading.samples) >= 95) {
        blinkStatus.textContent = "(>*.*)> Blink"
      } else {
        blinkStatus.textContent = "(>o.o)> Eyes Open"
      }
    }
    if (recording === true) {
      // storedResults[reading.electrode].push(Math.abs(Math.max.apply(null, reading.samples)));
      storedResults[reading.electrode].push(CalculateRMS(reading.samples))
    }
  });

  client.accelerometerData.subscribe(acceleration => {
    // console.log(acceleration)
  });
}


// web-bluetooth can only be started by a user gesture.
// This funciton is called by an html button
window.connect = function () {
  main();
}

// log stored Results. For testing purposes
window.showRecorded = function () {
  console.log(storedResults)
}

function createFeatures(resultsArray, classification) {
  recording = false
  for (let i = 0; i < resultsArray[3].length - 1; i += 1) {
    const x = resultsArray.map(electrode => (electrode[i]))
    var y = [classification]
    console.log(x)
    console.log(y)
    neuralNetwork.data.addData(x, y)
  }
  storedResults = [
    [],
    [],
    [],
    []
  ]
}

window.classify1 = function () {
  createFeatures(storedResults, "rest")
  recording = false
}

window.classify0 = function () {
  createFeatures(storedResults, "active")
  recording = false
}

window.train = function () {
  // normalize your data
  neuralNetwork.data.normalize();
  // train your model

  const trainingOptions = {
    batchSize: 64,
    epochs: 150
  }

  function whileTraining(epoch, loss) {
    console.log(`epoch: ${epoch}, loss:${loss}`);
  }

  function doneTraining() {
    console.log('done!');
    finishedTraining = true
  }
  neuralNetwork.train(trainingOptions, whileTraining, doneTraining)

  finishedTraining = true
}

function average(arr) {
  var sum = 0.
  arr.forEach((value, index) => {
    sum += value
  })
  return sum / arr.length
}

// a function to sleep
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// neuralNetowrk.classify returns an array of objects cooresponding to classifications
// along with their probabities. The array is sorted by lieklyhood, therefore a filter has to be
// applied using the classificatin label before calculating average probabilites over a series of 
// predictions
async function confidenceFromArray(classification) {
  const classificationArray = unfilteredResults
    .filter(classificationObject => (
      classificationObject.label == classification
    ))
    .map(activeObject => (activeObject.confidence))

  return classificationArray
}

async function classifyFlatten() {
  storedResults[3].forEach((value, index) => {
    const x = storedResults.map(electrode => (electrode[index]))
    neuralNetwork.classify(x, (err, results) => {
      unfilteredResults.push(...results)
    })
  })
}

var unfilteredResults = [];
var classificationArrayActive;
var classificationArrayRest;

async function getProbabilities() {

  recording = false

  await classifyFlatten();
  sleep(3000).then(async () => {
    console.log(unfilteredResults);
    classificationArrayActive = await confidenceFromArray('active');
    classificationArrayRest = await confidenceFromArray('rest');
    console.log(classificationArrayActive)
    console.log(classificationArrayRest)
  })
}


window.predict = async function () {
  await getProbabilities();
  // the neuralnNetowrk.classify is asyncronous, need to sleep or await
  // for the classificationArrays to populate
  sleep(6000).then(() => {
    probAcive = average(classificationArrayActive);
    probRest = average(classificationArrayRest);
    console.log(probAcive);
    console.log(probRest);
    sleep(3000).then(() => {
      document.querySelector('#prob0').textContent = probAcive.toFixed(4);
     document.querySelector('#prob1').textContent = probRest.toFixed(4);
      unfilteredResults = [];
      classificationArrayActive = [];
      classificationArrayRest = [];
      storedResults = [
        [],
        [],
        [],
        []
      ];
    })
  })
}

window.stop = function () {
  recording = false
  this.console.log(storedResults)
  this.console.log(unfilteredResults)
  this.console.log(classificationArrayActive)
  this.console.log(classificationArrayRest)
}