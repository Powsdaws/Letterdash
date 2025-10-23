//https://www.initialapps.com/adding-app-authentication-with-passportjs-on-a-mevn-stack/

import login from './login.js';
import signup from './signup.js';
import User from '../models/user.js';

const setupPassport = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, { _id: user._id });
  });

  passport.deserializeUser((userSession, done) => {
    User.findById(userSession._id)
      .then((user) => {
        console.log('deserializingUser');
        done(null, user);
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  login(passport);
  signup(passport);
};

export default setupPassport;
