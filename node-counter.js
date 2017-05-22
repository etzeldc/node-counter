// Boiler Plate: Bringing in HTTP and the File System
var http = require('http'); 
var fs = require('fs');

// Setting a global variable to hold the count of /cats.html's hits
var count = parseInt(fs.readFileSync('./nodeCount.html')); // synchronously reads the provided url and parses in the global variable

// Declaring a function to use when updating the hits count
function changeCount(fileName, count) { // takes in a file's name and the current count
    fs.writeFile(fileName, count, function(err) { // writes to that file, with the argument provided, and tests for errors
        if (err) { // if an error exists...
            console.log(err); // console it,
            return; // and return.
        } // ends if error statement
    }); // ends the file system's file writing function
} // ends the function 

// Boiler Plate: Setting a variable to hold server operations
var server = http.createServer(function(req, res) { // creates the server, taking in parameters for the request and a response
    if (req.url === "/") { // if the url provided in the request's argurment is equal to "/"...
        fs.readFile("./cats.html", function(err, data) { // reads the provided file, and performs an error check, taking in the data
            if (err) { // if an error exists...
                console.log("There was an error with the cats page"); // console it,
                return; // and return.
            } // ends if error statement
            res.write(data); // provided there was no error, write the data,
            count += 1; // the global variable is increased by one,
            changeCount('./nodeCount.html', count); // the above function is run to update the hits count in the provided file
            res.end(); // the response function ends
        }); // ends the file system's file reading function
    } else if (req.url === "/count") { // if the url provided in the request's argurment is equal to "/count"...
        fs.readFile("./nodeCount.html", function(err, data) { // reads the provided file, and performs an error check, taking in its data
            if (err) { // if an error exists...
                console.log("There was an error with the count page"); // console it,
                return; // and return.
            } // ends if error statement
            res.write(data);
            res.end(); // the response function ends
        }); // ends the file system's file reading function
    } // ends if/else-if statements 
}); // ends the serve function

// Boilder Plate: Starting the server
server.listen(8080); // setting the server to listen on port 8080
console.log("Server started on port 8080"); // consoling that the server started