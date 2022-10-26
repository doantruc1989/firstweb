"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = require("../controller/controller");
router.get('/login', controller_1.getLogin);
router.get('/register', controller_1.getRegister);
router.get('/profile', controller_1.getProfile);
router.get('/', controller_1.getHome);
module.exports = router;
