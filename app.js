const express = require('express');
const Joi = require('joi');
const app = express();
const log = require('./middleware/logger');
const auth = require('./auth');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');

const courses = require('./routes/courses');
const home = require('./routes/home');

// Set template engine
app.set('view engine', 'pug');
app.set('views', './views');

//builtIn middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //public is the name of the foldet which needs to send as an argument

//custom middlewares
app.use(log);
app.use(auth);

//third party middlewares
app.use(helmet());
console.log(`App environment is ${app.get('env')}`);
if(app.get('env') == "development"){
    debug("morgan listning...");
    app.use(morgan('tiny'));
}

app.use('/api/courses', courses);
app.use('/', home);

// Configurations
console.log(`App name is ${config.get('name')}`);
console.log(`host is ${config.get('mail.host')}`);
console.log(`password is ${config.get('mail.password')}`);

function validateInputs(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema);;
}



const port = process.env.PORT || 3001;
app.listen(port, ()=>{console.log(`Listning on the port ${port}...`)});

