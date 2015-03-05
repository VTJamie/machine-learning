require('sylvester');

var
    //LinearRegression = require('./modules/linear-regression')(),
    //GradientDescent = require('./modules/gradient-descent')(),
    NeuralNetwork = require('./modules/neural-network')(),
    Utility = require('./modules/utility')();

var trainingX = $M([
        [1, 0, 0]//,
        //[1, 0, 1],
        //[1, 1, 0],
        //[1, 1, 1]

]);

var trainingY = $M([
   [1]//,
    //[0],
    //[0],
    //[1]
]);

var network = new NeuralNetwork([2, 1], trainingX, trainingY, 0.001);
network.thetas = [
    $M([
        [-30, 20, 20],
        [10, -20, -20]
    ]),
    $M([
        [-10, 20, 20]
    ])
];


console.log(network.backProp());
//console.log(network.forwardProp(0));
//for (var idx = 0; idx < trainingX.rows(); idx++) {
//    console.log(network.forwardProp(idx));
//}





















