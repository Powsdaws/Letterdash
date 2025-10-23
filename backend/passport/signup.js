import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';
import bCrypt from 'bcrypt-nodejs';

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const setupSignupStrategy = (passport) => {
  passport.use('signup', new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      const findOrCreateUser = () => {
        User.findOne({ email: username })
          .then((user) => {
            if (user) {
              console.log('User already exists with email: ' + username);
              return done(null, false, 'That Email Already Exists');
            }

            const hash = createHash(password);
            const newUser = new User({
              email: username,
              password: hash,
            });

            newUser.save()
              .then((savedUser) => {
                console.log('User Registration successful');
                return done(null, savedUser);
              })
              .catch((err) => {
                console.log('Error in Saving user: ' + err);
                return done(err);
              });
          })
          .catch((err) => {
            console.log('Error in SignUp: ' + err);
            return done(err);
          });
      };

      process.nextTick(findOrCreateUser);
    }
  ));
};

export default setupSignupStrategy;
