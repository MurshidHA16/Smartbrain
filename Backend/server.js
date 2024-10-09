const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex');


//controllers files
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

//knex is used to connect server to database
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'your_database_password',
    database: 'smart_brain',
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors({
	origin: "http://localhost:3000"
}));


//sign in
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

//register/creating users
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) //dependency injection

//creating profile

app.get('/profile/:id', (req, res)=>{ profile.handleProfileGet(req, res, db)})

//updating image count

app.put('/image', (req, res)=>{ image.handleImage(req, res, db)})

/*app.post('/register', (req, res) =>{
	const {email, name, password} = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
	});

	// Load hash from your password DB.
	bcrypt.compare("bacon", hash, function(err, res) {
	    // res == true
	});
	bcrypt.compare("veggies", hash, function(err, res) {
	    // res = false
	});
}) */

app.listen(3001, ()=>{
	console.log('app is running on port 3001')
})




/*
/ --> res = this is working
/signin -->POST = return success/fail
/register --> POST = return user
/profile/:userID --> GET = return user
/image --> PUT --> user
*/