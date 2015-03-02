module.exports = function () {
    var linearAlgebra = require('linear-algebra')(),     // initialise it
        Vector = linearAlgebra.Vector,
        Matrix = linearAlgebra.Matrix,
        Utility = require('./utility')();
    NeuralNetwork = function (layers, trainingData) {

        this._init = function () {
            var idx,
                previouslayersize;
            this.thetas = [];
            this.trainingData = trainingData.clone();
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
            //console.log(currentActivation);
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