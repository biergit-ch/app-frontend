require("dotenv").config();
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-auth0";
import uid from 'uid-safe';
import authRoutes from './../../../../server/auth-routes';

const server = express();

const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
        maxAge: 86400 * 1000,
    },
    resave: false,
    saveUninitialized: true,
};
server.use(session(sessionConfig));

const auth0Strategy = new Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URI,
},
    (_accessToken, _refreshToken, _extraParams, profile, done) => {
        return done(null, profile);
    },
);

passport.use(auth0Strategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

server.use(passport.initialize());
server.use(passport.session());
server.use(authRoutes);

export default server;
