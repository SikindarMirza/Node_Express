const express = require('express');
const Joi = require('joi');
const app = express();
const log = require('./logger');
const auth = require('./auth');
const helmet = require('helmet');
const morgan = require('morgan');

//builtIn middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //public is the name of the foldet which needs to send as an argument

//custom middlewares
app.use(log);
app.use(auth);

//third party middlewares
app.use(helmet());
app.use(morgan('tiny'));


const courses = [
    { id:1, name: "course1" },
    { id:2, name: "course2" },
    { id:3, name: "course3" }    
]

app.get('/',(req,res)=>{
    res.send("Hello world!!!");
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found");
    res.send(course);
});


app.post('/api/courses', (req,res) => {
    
    const { error } = validateInputs(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id : courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req,res) => {
    //check if the course is present
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id is not present.");

    //validate the input values
    const { error } = validateInputs(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);

    //update the course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {

    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id is not present.");
    
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

});

function validateInputs(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema);;
}



const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`Listning on the port ${port}...`)});

