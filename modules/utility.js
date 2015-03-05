module.exports = function () {
    var sylvester = require('sylvester'),     // initialise it
        Vector = sylvester.Vector,
        Matrix = sylvester.Matrix,
        Utility = function () {
            this.randomMatrix = function (x, y) {
                var row, col,
                    rowArr,
                    rows = [];
                for (row = 0; row < x; row++) {
                    rowArr = [];
                    for (col = 0; col < y; col++) {
                        rowArr.push(Math.random());
                    }
                    rows.push(rowArr);
                }

                return $M (rows);
            };
            this.sigmoid = function(t) {
                return 1/(1+Math.pow(Math.E, -t));
            };

            this.multiplyEach = function (x, y) {
              return x.map(function (v, i, j) {
                 return v * y.e(i, j);
              });
            };
        };

    return new Utility();
};