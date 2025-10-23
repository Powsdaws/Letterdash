// backend/server.js
//Entry point!
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import wordRoutes from "./routes/word.js"
import dotenv from 'dotenv';
dotenv.config(); 

import session from 'express-session';
 // Authentication is stored in sessions, so we'll use express-session
import MongoStore from 'connect-mongo';  // Used to connect our session data to our MongoDB
import passport from 'passport'; // Passport is used for authentication

const app = express()
app.use(cors({
  origin: 'http://localhost:5173', //frontend server
  credentials: true               //allow cookies to be sent
}));
app.use(express.json())

console.log("Connecting to:", process.env.MONGODB_URI);


//Connect to db
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err))

const connectString = process.env.MONGODB_URI;

// Initialize Passport
import initPassport from './passport/init.js';
initPassport(passport);
// Create the Session
app.use(session({
	secret: process.env.SESSION_SK,
	resave: true,
	saveUninitialized: false,
	cookie: {
 		httpOnly: false,
		sameSite: true,
		maxAge: 10 * 4 * 60 * 60 * 1000,
	},
	store: MongoStore.create({
		mongoUrl: connectString,
		ttl: 10 *4 * 60 * 60,
	})
}));
app.use(passport.initialize()); // initialize passport login sessions
app.use(passport.session()); // for persistent login sessions



// mount routes
app.use("/api/word", wordRoutes) //routes everything to do with words


app.post('/api/login', (req, res, next) => {
	passport.authenticate('login', function(err, user, info) {
		if (err) {
			console.log('err');
			return res.sendStatus(400);
		}
		if (!user) {
			console.log('no user');
			return res.sendStatus(400);
		}		
		req.logIn(user, function(err) {
			if (err) { return next(err); } else {
				console.log(req.session)
				// return
				return res.sendStatus(200);					
			}
		});
	})(req, res, next);
});

/*** POST SIGNUP A USER ***/
app.post('/api/signup', (req, res, next) => {
	passport.authenticate('signup', registerUser)(req, res, next);
	function registerUser(err, user, info) {
		if (err) { console.log(err); return res.send(err) }
		if (!user) {
			return res.status(400).json(info);
		}
		if (user){
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				// return
				return res.sendStatus(200);
			});
		}
	}
});

/*** LOGOUT A USER ***/
app.post('/api/logout', (req, res, next) => {
	res.clearCookie('connect.sid'); 
	req.logout(function(err) {
		console.log('logged out');
		console.log(err)
		req.session.destroy(function (err) {
			res.send();
		});
	});
});



//Start the server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
