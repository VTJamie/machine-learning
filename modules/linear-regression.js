module.exports = function () {
    var linearAlgebra = require('linear-algebra')(),     // initialise it
        Vector = linearAlgebra.Vector,
        Matrix = linearAlgebra.Matrix,
        Utility = require('./utility')();
    LinearRegression = function () {
        this.hypothesis = function (theta, trainingX) {
            return theta.transpose().dot(trainingX.transpose());
        };
        this.cost = function (hypothesis, theta, trainingX, trainingY) {
            var totalcost = 0,
                idx,
                tempdifference;
            for (idx = 0; idx < trainingX.rows(); idx++) {
                tempdifference = this.costInstance(hypothesis, theta, idx, trainingX, trainingY);
                tempdifference = tempdifference * tempdifference;
                totalcost += tempdifference;

            }
            totalcost = totalcost / (trainingX.rows() * 2);
            return totalcost;
        };
        this.costInstance = function (hypothesis, theta, idx, trainingX, trainingY) {
            return hypothesis(theta, $M(trainingX.data[idx])) - trainingY.data[idx][0];
        };

        this.deltaVector = function (theta, hypothesis, trainingX, trainingY) {
            var i,
                j,
                totalstep = 0,
                dvec = [];
            for (j = 0; j < theta.rows(); j++) {
                totalstep = 0;
                for (i = 0; i < trainingX.rows(); i++) {
                    totalstep += this.costInstance(hypothesis, theta, i, trainingX, trainingY) * trainingX.data[i][j];
                }
                dvec.push(totalstep);
            }
            return $M(dvec).transpose();
        };
        this.dCost = function (hypothesis, theta, trainingX, trainingY) {
            var deltavector = this.deltaVector(theta, hypothesis, trainingX, trainingY);
            return deltavector.mulEach(1/trainingX.rows());
        };
    };
    return new LinearRegression();
};