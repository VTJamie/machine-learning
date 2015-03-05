module.exports = function () {
    var sylvester = require('sylvester'),     // initialise it
        Utility = require('./utility')();
    NeuralNetwork = function (layers, trainingData, trainingOutput, lambda) {

        this._init = function () {
            var idx,
                previouslayersize;
            this.thetas = [];
            this.lambda = lambda;
            this.trainingData = trainingData.dup();
            this.trainingOutput = trainingOutput.dup();
            for (idx = 0; idx < layers.length; idx++) {
                if (idx === 0) {
                    previouslayersize = trainingData.cols();
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
                currentActivation = this.trainingData.slice(trainingSetIdx+1, trainingSetIdx+1, 1, this.trainingData.cols()),
                allLayers = [currentActivation];

            for (layer = 0; layer < this.thetas.length; layer++) {
                activation = [];
                theta = this.thetas[layer];
                for (i = 0; i < theta.rows(); i++) {
                    activation.push(Utility.sigmoid(theta.slice(i+1, i+1, 1, theta.cols()).x(currentActivation.transpose()).sum()));
                }
                currentActivation = $M(activation);

                if (this.thetas.length !== layer + 1) {
                    currentActivation.elements.unshift([1]);
                    currentActivation = $M(currentActivation.elements).transpose();
                }
                allLayers.push(currentActivation);
            }
            return allLayers;
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
            for (i = 0; i < this.trainingData.rows(); i++) {
                currentOutputVector = this.trainingOutput.elements[i];
                allLayers = this.forwardProp(i);
                prediction = allLayers[allLayers.length-1];
                for (k = 0; k < currentOutputVector.length; k++) {
                    yIK = currentOutputVector[k];
                    logH = Math.log(prediction.elements[0][k]);
                    logH1 = Math.log(1 - prediction.elements[0][k]);

                    trainingCost += yIK * logH + (1 - yIK) * logH1;
                }
            }

            for (l = 0; l < this.thetas.length; l++) {
                for (i = 0; i < this.thetas[l].rows(); i++) {
                    for (j = 1; j < this.thetas[l].cols(); j++) {
                        regularization += Math.pow(this.thetas[l].elements[i][j], 2);
                    }
                }
            }

            regularization = ((lambda * regularization) / (2 * this.trainingData.rows()));
            trainingCost = -(trainingCost / this.trainingData.rows());
            return trainingCost + regularization;
        };

        this.backProp = function () {
            var i,
                l,
                currentD,
                currentActivation,
                thetaMulDelta,
                sigmoidD,
                allLayers,
                allDeltas,
                DELTA = [];

            for (i = 0; i < this.trainingData.rows(); i++) {
                allLayers = this.forwardProp(i);
                allDeltas = [];
                currentD = allLayers[allLayers.length-1].subtract(this.trainingOutput.slice(i+1, i+1, 1, this.trainingOutput.cols()));
                allDeltas.unshift(currentD);
                for (l = this.thetas.length-1; l >= 1; l--) {

                    currentActivation = allLayers[l];
                    sigmoidD = currentActivation.map(function(v) {
                        return (1 - v)*v;
                    });

                    thetaMulDelta =  this.thetas[l].transpose().x(currentD).transpose();
                    currentD = Utility.multiplyEach(thetaMulDelta, sigmoidD).transpose();
                    allDeltas.unshift(currentD);
                }

                for(l = 0; l < allDeltas.length; l++) {
                    if (DELTA.length <= l) {
                        DELTA.push(allDeltas[l].x(allLayers[l]));
                    } else {
                        DELTA[l].add(allDeltas[l].x(allLayers[l]));
                    }
                }
            }

            return DELTA;
        };

        this.gradientCheck = function () {
            var i,
                thetaPlus,
                thetaMinus,
                epsilon = 0.01;
            for (i = 0; i < this.trainingData.rows(); i++) {
               // thetaPlus
            }
        };

        this.gradientDescent = function () {

        };


        this._init();
    };
    return NeuralNetwork;
};