module.exports = function () {
    var linearAlgebra = require('linear-algebra')(),     // initialise it
        Vector = linearAlgebra.Vector,
        Matrix = linearAlgebra.Matrix,
        Utility = require('./utility')();
    NeuralNetwork = function (layers, trainingData, trainingOutput, lambda) {

        this._init = function () {
            var idx,
                previouslayersize;
            this.thetas = [];
            this.lambda = lambda;
            this.trainingData = trainingData.clone();
            this.trainingOutput = trainingOutput.clone();
            for (idx = 0; idx < layers.length; idx++) {
                if (idx === 0) {
                    previouslayersize = trainingData.cols;
                } else {
                    previouslayersize = layers[idx - 1] + 1;
                }
                this.thetas.push(Utility.randomMatrix(layers[idx], previouslayersize));
            }
        };


        this.forwardProp = function (trainingSetIdx) {
            var activation = [],
                i,
                layer,
                theta,
                currentActivation = new Matrix(this.trainingData.data[trainingSetIdx]);
            for (layer = 0; layer < this.thetas.length; layer++) {
                activation = [];
                theta = this.thetas[layer];
                for (i = 0; i < theta.rows; i++) {
                    activation.push(new Matrix(theta.data[i]).dot(currentActivation.trans()).getSum());
                }
                currentActivation = new Matrix(activation).sigmoid();
                if (this.thetas.length !== layer + 1) {

                    currentActivation.data[0].unshift(1);
                    currentActivation = new Matrix(currentActivation.data);
                }
            }

            return currentActivation;
        };

        this.cost = function () {
            var i,
                k,
                l,
                j,
                currentOutputVector,
                regularization = 0,
                trainingCost = 0,
                prediction,
                yIK;
            for (i = 0; i < this.trainingData.rows; i++) {
                currentOutputVector = this.trainingOutput.data[i];
                prediction = this.forwardProp(i);
                for (k = 0; k < currentOutputVector.length; k++) {
                    yIK = currentOutputVector[k];
                    logH = Math.log(prediction.data[0][k]);
                    logH1 = Math.log(1 - prediction.data[0][k]);

                    trainingCost += yIK * logH + (1 - yIK) * logH1;
                }
            }

            for (l = 0; l < this.thetas.length; l++) {
                for (i = 0; i < this.thetas[l].rows; i++) {
                    for (j = 1; j < this.thetas[l].cols; j++) {
                        regularization += Math.pow(this.thetas[l].data[i][j], 2);
                    }
                }
            }

            regularization = ((lambda * regularization) / (2 * this.trainingData.rows));
            trainingCost = -(trainingCost / this.trainingData.rows);
            return trainingCost + regularization;
        };

        this.backProp = function () {

        };

        this.gradientCheck = function () {

        };

        this.gradientDescent = function () {

        };


        this._init();
    };
    return NeuralNetwork;
};