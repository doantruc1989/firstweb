"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHome = exports.getProfile = exports.getRegister = exports.getLogin = void 0;
function getLogin(req, res, next) {
    res.send("Hello Truc login!");
}
exports.getLogin = getLogin;
function getRegister(req, res, next) {
    res.send("Hello Truc register!");
}
exports.getRegister = getRegister;
function getProfile(req, res, next) {
    res.send("Hello Truc profile!");
}
exports.getProfile = getProfile;
function getHome(req, res, next) {
    res.send("Hello Truc home!");
}
exports.getHome = getHome;
// export = {
//     getHome,
//     getLogin,
//     getRegister,
//     getProfile
// }
