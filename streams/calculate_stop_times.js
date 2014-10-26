
// Reads arrrivals data in 01_2013 (and other files
// Calculates the amount of minutes a train stops at a certain station.
// Writes its results into data/stop_times

csv = require("fast-csv");
fs = require("fs");
util=require("util")

var stream = fs.createReadStream("../data/01_2013.csv");
var ws = csv.createWriteStream({headers: true});
ws.pipe(fs.createWriteStream("../data/stop_times.csv"));

var csvStream = csv({objectMode:true, headers:true})
    // Takes out the first and last stations of a train track.
    .validate(function(data){
        return data.is_first != '1' && data.is_last != '1';
    })
    .on("data-invalid", function(data){
        //console.log('INVALID', data);
    })
    .on("data", function(data){

        var stop = {stop_name: data.stop_name,
                    date: (new Date(data.actual_arrival)).toDateString(),
                    time: new Date(data.actual_arrival).toTimeString().substring(0, 5),
                    stop_time: (new Date(data.actual_departure)-new Date(data.actual_arrival))/60000
        }
        ws.write(stop);
    })

// Headers for out output!
stream.pipe(csvStream)//.pipe(ws);
console.log("Hey! Running...");