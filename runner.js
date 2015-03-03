var linearAlgebra = require('linear-algebra')(),     // initialise it
    Vector = linearAlgebra.Vector,
    Matrix = linearAlgebra.Matrix,//,
    LinearRegression = require('./modules/linear-regression')(),
    GradientDescent = require('./modules/gradient-descent')(),
    NeuralNetwork = require('./modules/neural-network')(),
    Utility = require('./modules/utility')();

var trainingX = new Matrix([
        [1, 0, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 1, 1]

]);

var trainingY = new Matrix([
   [1],
    [0],
    [0],
    [1]
]);

var network = new NeuralNetwork([2, 1], trainingX, trainingY, 0.001);
network.thetas = [
    new Matrix([
        [-30, 20, 20],
        [10, -20, -20]
    ]),
    new Matrix([
        [-10, 20, 20]
    ])
];


console.log(network.cost());
//for (var idx = 0; idx < trainingX.rows; idx++) {
//    console.log(network.forwardProp(idx));
//}





















