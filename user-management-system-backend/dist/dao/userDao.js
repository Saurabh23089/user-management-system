"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.createUser = createUser;
exports.countUsersByRole = countUsersByRole;
const user_1 = __importDefault(require("../models/user"));
async function findUserByEmail(email) {
    return user_1.default.findOne({ email: email });
}
async function createUser(payload) {
    return user_1.default.create(payload);
}
async function countUsersByRole(role) {
    return user_1.default.countDocuments({ role });
}
