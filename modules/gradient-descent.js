module.exports = function () {
    var linearAlgebra = require('linear-algebra')(),     // initialise it
        Vector = linearAlgebra.Vector,
        Matrix = linearAlgebra.Matrix
    GradientDescent = function () {
        this.calculate = function (theta, alpha, dCost) {
            return theta.minus(dCost.mulEach(alpha));
        };
    };

    return new GradientDescent();
};