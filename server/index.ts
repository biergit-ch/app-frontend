require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import http from "http";
import next from "next";
import passport from "passport";
import { Strategy } from "passport-auth0";
import uid from 'uid-safe';
import authRoutes from './auth-routes';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle: any = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // 2 -
  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000,
    },
    resave: false,
    saveUninitialized: true,
  };
  server.use(session(sessionConfig));

  // 3 - configuring Auth0Strategy
  const auth0Strategy = new Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URI,
  },
    // tslint:disable-next-line: max-line-length
    (_accessToken, _refreshToken, _extraParams, profile, done) => {
      return done(null, profile);
    },
  );

  // 4 - configuring Passport
  passport.use(auth0Strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  // 5 - adding Passport and authentication routes
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(authRoutes);

  // 6 - you are restricting access to some routes
  const restrictAccess = (req: Request, res: Response, nextFunc: NextFunction) => {
    if (!req.isAuthenticated()) { return res.redirect("/login"); }
    nextFunc();
  };

  server.use("/profile", restrictAccess);

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`listening on port ${process.env.PORT}`);
  });
});
