const express = require('express'); //bringing in express from third party module
const path = require('path');
const fs = require('fs');
let app = express(); //call as function, this will return the app to us 

app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//     res.send('Hello from the web server side');
// });

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
}); //didn't send a response, so it will continue on to the next*/

app.post('/contact-form', (req, res, next) => {
    let dataPath = path.join(__dirname, '../personInfo.json');

    let person = {
        name: (req.body.name),
        email: (req.body.email)
    }

    fs.readFile(dataPath, (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));

        let personInfo = JSON.parse(data);
        personInfo.push(person);

        fs.writeFile(dataPath, JSON.stringify(personInfo), (err) => {
            if (err) throw err;
            console.log('cool');
        })
    })

    res.send('Thank you for submitting your contact form!');
});

app.get("/formsubmissions", (req, res, next) => {
    // use fs to read the file
    let dataPath = path.join(__dirname, '../personInfo.json');
    fs.readFile(dataPath, (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));

        let personInfo = JSON.parse(data);
        // personInfo.push(person);

        res.send(data);
        // send back the results
    })
});

app.use(express.static(path.join(__dirname, '../public')));
//express static will serve up any public files when they are available


app.listen(3000);
//Turn server on: listen on a specific port (port number 3000)
//localhost is a loopback IP mechanism that allows our browser to hit our local computer
//could also use special IP address: 127.0.0.1:3000

