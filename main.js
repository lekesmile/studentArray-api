'use strict'
// require express & body-parser
const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');




const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended:true}));  //support encoded body



// Array student for testing
const students = [
    {id:1, name: 'Monday', lastname: 'Suununtaina'},
    {id:2, name: 'Tuesday', lastname: 'Lauantaina'},
    {id:3, name: 'Wednesday', lastname: 'Perjataina'},
    {id:4, name: 'Thursday', lastname: 'Torstaina'}

]

// Home route
app.get('/', (req, res) =>{
    res.send('Hello man');
});

//All Students array API route 
app.get('/api/students', (req, res) => {
    res.send(students);
});

// Specific student route
app.get('/api/students/:id', (req, res) =>{
      
   const getStudent = students.find(any => any.id === parseInt(req.params.id));
    if (!getStudent) {
        res.send('error 404');
    }
    res.send(getStudent);
});

//Post request to our students array
app.post('/api/students', (req, res) =>{

    const schema = {
        name: Joi.string().min(3).required(),
        lastname:Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
        
    }

    const setNewStudent = {
        id: students.length + 1,
        name: req.body.name,
        lastname: req.body.lastname
    }
  students.push(setNewStudent);
  res.send(setNewStudent);
});


//update our ready student

app.put('/api/student/:id', (req, res)=>{
    const update =  students.find(any => any.id === parseInt(req.params.id));
    if (!update) {
        res.status(400).send('The student ID does not exit');
        return;
    }

    const schema = {
        name: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required()
    };

    const result= Joi.validate(req.body, schema);
    if (result.error ) {
        res.status(400).send(resultName.error.details[0].message );
        return;
    }
        //    const up = {
        //         name = req.body.name,
        //         lastname = req.body.lastname
        //     }
           
        // students.update(up)
        // res.send(up);
    
});

//delect from the array

app.delete('/api/students/:id', (req, res)=>{
    const delect = students.find(any =>any.id === parseInt(req.params.id));
    if (!delect) {
        res.status(400).send('The student ID does not exit');
    }

    const de = { 
     name :" ",
     lastname : " "
     }
    students.pop(de);
    res.send(de);
});


const port = process.env.PORT || 3000

app.listen(port, () => console.log(`port is running on ${port} `));









// app.get();    Get a res/req from the server
// app.post();   Post a req/res to the server
// app.put();    update our server
// app.delete();  delect from out server