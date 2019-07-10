import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/api/auth/login", passport.authenticate("auth0", {
    scope: "openid email profile",
}), (_req, res) => {
    res.redirect("/");
});

router.get("/api/auth/callback",
    passport.authenticate('auth0', { failureRedirect: '/' }),
    (req, res) => {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect("/");
    },
);

router.get("/api/auth/logout", (req, res) => {
    req.logout();

    const {
        AUTH0_DOMAIN,
        AUTH0_CLIENT_ID,
        BASE_URL,
    } = process.env;
    res.redirect(`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`);
});

export default router;
