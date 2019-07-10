"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
const next_1 = __importDefault(require("next"));
const passport_1 = __importDefault(require("passport"));
const passport_auth0_1 = require("passport-auth0");
const uid_safe_1 = __importDefault(require("uid-safe"));
const authRoutes = require('./auth-routes');
const dev = process.env.NODE_ENV !== "production";
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = express_1.default();
    // 2 -
    const sessionConfig = {
        secret: uid_safe_1.default.sync(18),
        cookie: {
            maxAge: 86400 * 1000,
        },
        resave: false,
        saveUninitialized: true,
    };
    server.use(express_session_1.default(sessionConfig));
    // 3 - configuring Auth0Strategy
    const auth0Strategy = new passport_auth0_1.Strategy({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL,
    }, 
    // tslint:disable-next-line: max-line-length
    (_accessToken, _refreshToken, _extraParams, profile, done) => {
        return done(null, profile);
    });
    // 4 - configuring Passport
    passport_1.default.use(auth0Strategy);
    passport_1.default.serializeUser((user, done) => done(null, user));
    passport_1.default.deserializeUser((user, done) => done(null, user));
    // 5 - adding Passport and authentication routes
    server.use(passport_1.default.initialize());
    server.use(passport_1.default.session());
    server.use(authRoutes);
    // 6 - you are restricting access to some routes
    const restrictAccess = (req, res, nextFunc) => {
        if (!req.isAuthenticated()) {
            return res.redirect("/login");
        }
        nextFunc();
    };
    server.use("/profile", restrictAccess);
    server.use("/share-thought", restrictAccess);
    // handling everything else with Next.js
    server.get("*", handle);
    http_1.default.createServer(server).listen(process.env.PORT, () => {
        // tslint:disable-next-line: no-console
        console.log(`listening on port ${process.env.PORT}`);
    });
});
//# sourceMappingURL=index.js.map