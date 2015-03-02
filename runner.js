var linearAlgebra = require('linear-algebra')(),     // initialise it
    Vector = linearAlgebra.Vector,
    Matrix = linearAlgebra.Matrix,//,
    LinearRegression = require('./modules/linear-regression')(),
    GradientDescent = require('./modules/gradient-descent')(),
    NeuralNetwork = require('./modules/neural-network')(),
    Utility = require('./modules/utility')();

var trainingX = new Matrix([
        [1, 2]

]);

var network = new NeuralNetwork([1], trainingX);

console.log(network.forwardProp(0));



















