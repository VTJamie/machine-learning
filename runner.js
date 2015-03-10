require('sylvester');

var data = require('./data/rows.json'),
    fastcsv = require('fast-csv');


data = data.data.map(function (cv, idx, array) {

    return {
        newversion: new Date(cv.slice(8, 9)[0]).getTime() >= new Date("10/22/2013").getTime(),
        nums: cv.slice(9, 10)[0].split(" ").map(function (numsv) {return parseInt(numsv, 10);}),
        megaball: parseInt(cv.slice(10, 11)[0], 10)
    };
});

for (var idx = 0; idx < data.length; idx++) {
    if (!data[idx].newversion) {
         data.splice(idx, 1);
        idx--;
    }
}



//console.log(data, data.length);


var numdset = [],
    megadset = [];
for (var idx = 0; idx < data.length; idx++) {
    var nums = new Array(75),
        mbs = new Array(15);

    for (var x = 0; x < nums.length; x++)
    {
        nums[x] = 0;
    }

    for (var x = 0; x < mbs.length; x++) {
        mbs[x] = 0;
    }

    for (var ni = 0; ni < data[idx].nums.length; ni++) {
        nums[data[idx].nums[ni]-1] = 1;
    }

    mbs[data[idx].megaball-1] = 1;
    numdset.push(nums);
    megadset.push(mbs);
}

//for(var idx = 0; idx < dataset.length; idx++) {
//    console.log(dataset[idx].join(" "));
//}

fastcsv.writeToPath("data/ynum.csv", numdset.slice(5, numdset.length), {headers: false})
    .on("finish", function () {
        for(var i = 0; i < numdset.length; i++) {
            for (var j = 0; j < numdset[i].length; j++) {
                numdset[i][j] = numdset[i][j] === 1 ? 0.999999 : 0.000001;
            }
        }

        var numtraining = [];

        for(var i = 0; i < numdset.length-5; i++) {
            numtraining.push(numdset[i].concat(numdset[i+1]).concat(numdset[i+2]).concat(numdset[i+3]).concat(numdset[i+4]));
        }
        console.log(numtraining.length);
        fastcsv.writeToPath("data/xnum.csv", numtraining.slice(0, numtraining.length), {headers: false})
            .on("finish", function () {
                console.log("done nums");
            });
    });

fastcsv.writeToPath("data/ymega.csv", megadset.slice(5, megadset.length), {headers: false})
    .on("finish", function () {
        for(var i = 0; i < megadset.length; i++) {
            for (var j = 0; j < megadset[i].length; j++) {
                megadset[i][j] = megadset[i][j] === 1 ? 0.999999 : 0.000001;
            }
        }

        var megatraining = [];

        for(var i = 0; i < megadset.length-5; i++) {
            megatraining.push(megadset[i].concat(megadset[i+1]).concat(megadset[i+2]).concat(megadset[i+3]).concat(megadset[i+4]));
        }

        console.log(megatraining.length);
        fastcsv.writeToPath("data/xmega.csv", megatraining.slice(0, megatraining.length), {headers: false})
            .on("finish", function () {
                console.log("done mega");
            });
    });












