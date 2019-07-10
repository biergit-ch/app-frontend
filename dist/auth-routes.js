"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/auth/login", passport_1.default.authenticate("auth0", {
    scope: "openid email profile",
}), (_req, res) => res.redirect("/"));
router.get("/callback", (req, res, next) => {
    passport_1.default.authenticate("auth0", (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login");
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            res.redirect("/");
        });
    })(req, res, next);
});
router.get("/auth/logout", (req, res) => {
    req.logout();
    const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL, } = process.env;
    res.redirect(`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`);
});
exports.default = router;
//# sourceMappingURL=auth-routes.js.map