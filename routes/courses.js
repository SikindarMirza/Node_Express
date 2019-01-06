const express = require('express');
const router = express.Router();

const courses = [
    { id:1, name: "course1" },
    { id:2, name: "course2" },
    { id:3, name: "course3" }    
]

router.get('/', (req,res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found");
    res.send(course);
});


router.post('/', (req,res) => {
    
    const { error } = validateInputs(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id : courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req,res) => {
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

router.delete('/:id', (req,res) => {

    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id is not present.");
    
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

});

module.exports = router;