function setupAuth(User, app) {
    var passport = require('passport'),
        FacebookStrategy = require('passport-facebook').Strategy;

    // High level serialize/deserialize configuration for passport
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }).exec(done);
    });

    // Facebook specific
    passport.use(new FacebookStrategy(
        {
            clientID: 295524347496218,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            profileFields: [ 'id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified' ]
        },
        function(accessToken, refreshToken, profile, done) {
            if (!profile.emails || !profile.emails.length) {
                return done('No emails associated with this account')
            }

            User.findOneAndUpdate(
                { 'data.oauth': profile.id },
                {
                    $set: {
                        'profile.username': profile.emails[0].value,
                        'profile.picture': 'http://graph.facebook.com/' + profile.id.toString() + '/picture?type=large'
                    }
                },
                { 'new': true, upsert: true, runValidators: true },
                function(error, user) {
                    done(error, user)
                }
            );
        }
    ));


    // Express middleware
    app.use(require('express-session') ({ secret: 'this is a secret' }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: ['email'] }));
    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/fail' }),
        function(req, resp) {
            resp.send('Bienvenido/Welcome, ' + req.user.profile.username + '. <img src="' + req.user.profile.picture + '">');
        }
    );
}

module.exports = setupAuth;
