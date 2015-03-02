module.exports = function () {
    var linearAlgebra = require('linear-algebra')(),     // initialise it
        Vector = linearAlgebra.Vector,
        Matrix = linearAlgebra.Matrix,
        Utility = require('./utility')();
    LinearRegression = function () {
        this.hypothesis = function (theta, trainingX) {
            return theta.trans().dot(trainingX.trans()).getSum();
        }
    };
    return new LinearRegression();
};