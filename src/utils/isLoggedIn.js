import passport from '../auth/passport.js';


function isLoggedin(req, res, next) {
    passport.authenticate('jwt', { session: false })(req, res, next);
}

export default isLoggedin;
