"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/api/auth/login", passport_1.default.authenticate("auth0", {
    scope: "openid email profile",
}), (_req, res) => {
    res.redirect("/");
});
router.get("/api/auth/callback", passport_1.default.authenticate('auth0', { failureRedirect: '/' }), (req, res) => {
    if (!req.user) {
        throw new Error('user null');
    }
    res.redirect("/");
});
router.get("/api/auth/logout", (req, res) => {
    req.logout();
    const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL, } = process.env;
    res.redirect(`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`);
});
exports.default = router;
//# sourceMappingURL=auth-routes.js.map