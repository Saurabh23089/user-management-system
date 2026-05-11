"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/signup', userController_1.userSignup);
userRoutes.post('/login', userController_1.userLogin);
exports.default = userRoutes;
