// https://www.initialapps.com/adding-app-authentication-with-passportjs-on-a-mevn-stack/
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';
import bCrypt from 'bcrypt-nodejs';

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

const setupLoginStrategy = (passport) => {
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
  async function(req, username, password, done) {
    username = username.toLowerCase();

    try {
      const user = await User.findOne({ email: username });

      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false, 'Invalid Username');
      }

      if (!user.password) {
        console.log('No Password');
        return done(null, false, 'No Password');
      }

      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false, 'Invalid Password');
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
};

export default setupLoginStrategy;
