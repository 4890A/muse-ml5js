

function brainaf() {


// now generate some random data
var points = [];
var max = 0;
var width = 388;
var height = 388;
var len = 10;

var url2 = `/braina`

console.log("GETTING DATA")

d3.json(url2, function(BAarray) {

  totaln += 1;

  var subjectd = BAarray.subject_data

  console.log("Real: ",BAarray.real_output)

  console.log("Prediction: ", BAarray.NN.prediction)

  // PLACE ACTUAL SUBJECT CLASSIFICATION
  var pdata = d3.select("#ACT");
  pdata.html("");
  pdata.append("p").text(`Classification: ${BAarray.real_output}`);

  // RESULTS FROM NEURAL NETWORK MODEL
  if (BAarray.NN.prediction[0] == BAarray.real_output[0]) {
    nn += 1;
  };

  pdata = d3.select("#NN");
  pdata.html("");
  pdata.append("p").text(`Accuracy: ${BAarray.NN.model_accuracy}`);
  pdata.append("p").text(`Loss: ${BAarray.NN.model_loss}`);
  pdata.append("p").text(`Prediction: ${BAarray.NN.prediction}`);
  pdata.append("p").text(`Number of Correct Predictions: ${nn} of ${totaln}`);


  // RESULTS FROM 1D Convolutional Neural Networks
  if (BAarray.DCNN.prediction[0] == BAarray.real_output[0]) {
    dnn += 1;
  };

  pdata = d3.select("#CNN");
  pdata.html("");
  pdata.append("p").text(`Accuracy: ${BAarray.DCNN.model_accuracy}`);
  pdata.append("p").text(`Loss: ${BAarray.DCNN.model_loss}`);
  pdata.append("p").text(`Prediction: ${BAarray.DCNN.prediction}`);
  pdata.append("p").text(`Number of Correct Predictions: ${dnn} of ${totaln}`);

  // RESULTS FROM lOGISTIC REGRESSION
  if (BAarray.LR.prediction[0] == BAarray.real_output[0]) {
    lr += 1;
  };
  pdata = d3.select("#LR");
  pdata.html("");
  pdata.append("p").text(`Accuracy: ${BAarray.LR.model_accuracy}`);
  pdata.append("p").text(`Loss: ${BAarray.LR.model_loss}`);
  pdata.append("p").text(`Prediction: ${BAarray.LR.prediction}`);
  pdata.append("p").text(`Number of Correct Predictions: ${lr} of ${totaln}`);


var dataPoints = [
  {x: 160, //FP1
  y: 80,
  value: 0},
  {x: 230, //FP2
    y: 80,
    value: 0},
  {x: 95, //F7
    y: 130,
    value: 0},
  {x: 290, //F8
    y: 120,
    value: 0},
  {x: 185, //AF1
    y: 100,
    value: 0},
  {x: 205, //AF2
    y: 100,
    value: 0},
  {x: 195, //Fz
    y: 125,
    value: 0},
  {x: 240, //F4
  y: 125,
  value: 0},
  {x: 150, //F3
  y: 125,
  value: 0},
  {x: 280, //FC6
    y: 155,
    value: 0},
  {x: 115, //FC5
    y: 150,
    value: 0},
  {x: 220, //FC2
    y: 155,
    value: 0},
  {x: 170, //FC1
    y: 155,
    value: 0},
  {x: 300, //T8
    y: 185,
    value: 0},
  {x: 80, //T7
    y: 185,
    value: 0},
  {x: 195, //Cz
    y: 185,
    value: 0},
  {x: 135, //C3
    y: 185,
    value: 0},
  {x: 250, //C4
    y: 185,
    value: 0},
  {x: 110, //CP5
    y: 220,
    value: 0},
  {x: 280, //CP6
    y: 220,
    value: 0},
  {x: 165, //CP1
    y: 220,
    value: 0},
  {x: 225, //CP2
    y: 220,
    value: 0},
  {x: 145, //P3
    y: 250,
    value: 0},
  {x: 245, //P4
    y: 245,
    value: 0},
  {x: 195, //Pz
    y: 245,
    value: 0}, 
  {x: 290, //P8
    y: 255,
    value: 0}, 
  {x: 100, //P7
    y: 255,
    value: 0}, 
  {x: 185, //PO2
    y: 255,
    value: 0},
  {x: 205, //PO1
    y: 255,
    value: 0},
  {x: 230, //O2
    y: 300,
    value: 0},
  {x: 160, //O1
    y: 300,
    value: 0},
  {x: 500, //X(M)
    y: 500,
    value: 0},
  {x: 120, //AF7
    y: 100,
    value: 0},
  {x: 260, //AF8
    y: 100,
    value: 0},
  {x: 120, //F5
    y: 140,
    value: 0},
  {x: 265, //F6
    y: 125,
    value: 0},
  {x: 80, //FT7
    y: 150,
    value: 0},
  {x: 300, //FT8
    y: 155,
    value: 0},
  {x: 195, //FPz
    y: 100,
    value: 0},
  {x: 250, //FC4
    y: 155,
    value: 0},
  {x: 140, //FC3
    y: 155,
    value: 0},
  {x: 280, //C6
    y: 185,
    value: 0},
  {x: 100, //C5
    y: 185,
    value: 0},
  {x: 220, //F2
    y: 125,
    value: 0},
  {x: 175, //F1
    y: 125,
    value: 0},
  {x: 310, //TP8
    y: 220,
    value: 0},
  {x: 85, //TP7
    y: 220,
    value: 0},
  {x: 195, //AFZ
    y: 100,
    value: 0},
  {x: 140, //CP3
    y: 220,
    value: 0},    
  {x: 250, //CP4
    y: 220,
    value: 0},
  {x: 120, //P5
    y: 250,
    value: 0},
  {x: 265, //P6
    y: 250,
    value: 0},
  {x: 165, //C1
    y: 185,
    value: 0},
  {x: 225, //C2
    y: 185,
    value: 0},
  {x: 125, //PO7
    y: 280,
    value: 0},
  {x: 260, //PO8
    y: 285,
    value: 0},
  {x: 190, //FCz
    y: 155,
    value: 0},
  {x: 195, //POz
    y: 270,
    value: 0},
  {x: 210, //Oz
    y: 300,
    value: 0},
  {x: 220, //P2
    y: 245,
    value: 0},
  {x: 170, //P1
    y: 250,
    value: 0},  
  {x: 195, //CPz
    y: 220,
    value: 0}, 
  {x: 500, //nd(M)
    y: 500,
    value: 0},  
  {x: 500, //Y(M)
    y: 500,
    value: 0}, 
];

subjectd.forEach(function (el, i) {dataPoints[i].value = el});

heatmapInstance.addData(dataPoints);

});

};

function initpage() {

  totaln = 0
  nn = 0
  dnn = 0
  lr = 0
  brainaf();

  totalp = 0
  pnn = 0
  lsp = 0
  phoned()

  totalw = 0
  wnn = 0
  lsw = 0
  watchd()

};

function phoned(){


  var url2 = `/haphone`

  d3.json(url2, function(phdata) {
  
    totalp += 1;

    console.log("IN PHONE")

    var imagep = ""
    if (phdata.real_output[0] == "bike"){
      imagep = 'static/img/bike.png'
    } else if (phdata.real_output[0] == "walk") {
      imagep = 'static/img/walk.png'
    } else if (phdata.real_output[0] == "stand") {
      imagep = 'static/img/stand.png'
    } else if (phdata.real_output[0] == "stairsdown") {
      imagep = 'static/img/down.png'
    } else if (phdata.real_output[0] == "sit") {
      imagep = 'static/img/sit.png'
    } else {
      imagep = 'static/img/up.png'
    };

    // var svg = d3.select('svg')

    var svg = d3.select('svg')
    
    svg.html("");

    var myimage = svg.append('image')
    .attr('xlink:href', imagep)
    .attr('width', 375)
    .attr('height', 375)



    // PLACE ACTUAL SUBJECT CLASSIFICATION
    var pdata = d3.select("#ACTP");
    pdata.html("");
    pdata.append("p").text(`Classification: ${phdata.real_output}`);
  
    // RESULTS FROM NEURAL NETWORK MODEL
    if (phdata.NN.prediction[0] == phdata.real_output[0]) {
      pnn += 1;
    };
  
    pdata = d3.select("#NNP");
    pdata.html("");
    pdata.append("p").text(`Accuracy: ${phdata.NN.model_accuracy}`);
    pdata.append("p").text(`Loss: ${phdata.NN.model_loss}`);
    pdata.append("p").text(`Prediction: ${phdata.NN.prediction}`);
    pdata.append("p").text(`Number of Correct Predictions: ${pnn} of ${totalp}`);
  
  
    // RESULTS FROM LSTM - Recurrent Network
    if (phdata.RNN.prediction[0] == phdata.real_output[0]) {
      lsp += 1;
    };
  
    pdata = d3.select("#LSTMP");
    pdata.html("");
    pdata.append("p").text(`Accuracy: ${phdata.RNN.model_accuracy}`);
    pdata.append("p").text(`Loss: ${phdata.RNN.model_loss}`);
    pdata.append("p").text(`Prediction: ${phdata.RNN.prediction}`);
    pdata.append("p").text(`Number of Correct Predictions: ${lsp} of ${totalp}`);

  });
}



function watchd(){

  var url2 = `/hawatch`

  d3.json(url2, function(phdata) {
  
    totalw += 1;

    var imagep = ""
    if (phdata.real_output[0] == "bike"){
      imagep = 'static/img/bike.png'
    } else if (phdata.real_output[0] == "walk") {
      imagep = 'static/img/walk.png'
    } else if (phdata.real_output[0] == "stand") {
      imagep = 'static/img/stand.png'
    } else if (phdata.real_output[0] == "stairsdown") {
      imagep = 'static/img/down.png'
    } else if (phdata.real_output[0] == "sit") {
      imagep = 'static/img/sit.png'
    } else {
      imagep = 'static/img/up.png'
    };

    imgw = d3.select('#IMGW')

    var svg = imgw.select('svg')
    
    svg.html("");

    var myimage = svg.append('image')
    .attr('xlink:href', imagep)
    .attr('width', 375)
    .attr('height', 375)

    // PLACE ACTUAL SUBJECT CLASSIFICATION
    var pdata = d3.select("#ACTW");
    pdata.html("");
    pdata.append("p").text(`Classification: ${phdata.real_output}`);
  
    // RESULTS FROM NEURAL NETWORK MODEL
    if (phdata.NN.prediction[0] == phdata.real_output[0]) {
      wnn += 1;
    };
  
    pdata = d3.select("#NNW");
    pdata.html("");
    pdata.append("p").text(`Accuracy: ${phdata.NN.model_accuracy}`);
    pdata.append("p").text(`Loss: ${phdata.NN.model_loss}`);
    pdata.append("p").text(`Prediction: ${phdata.NN.prediction}`);
    pdata.append("p").text(`Number of Correct Predictions: ${wnn} of ${totalw}`);
  
  
    // RESULTS FROM LSTM - Recurrent Network
    if (phdata.RNN.prediction[0] == phdata.real_output[0]) {
      lsw += 1;
    };
  
    pdata = d3.select("#LSTMW");
    pdata.html("");
    pdata.append("p").text(`Accuracy: ${phdata.RNN.model_accuracy}`);
    pdata.append("p").text(`Loss: ${phdata.RNN.model_loss}`);
    pdata.append("p").text(`Prediction: ${phdata.RNN.prediction}`);
    pdata.append("p").text(`Number of Correct Predictions: ${lsw} of ${totalw}`);

  });
}

// minimal heatmap instance configuration
var heatmapInstance = h337.create({
  // only container is required, the rest will be defaults
  container: document.querySelector('.heatmap_avg')
});

initpage();

var button = d3.select("#btn_braina");

button.on("click", function() {

  brainaf();

});

var button = d3.select("#btn_phone");

button.on("click", function() {

  phoned();

});

var button = d3.select("#btn_watch");

button.on("click", function() {

  watchd();

});
