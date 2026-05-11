"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureRoutes;
const userRoutes_1 = __importDefault(require("./userRoutes"));
function configureRoutes(app) {
    app.use('/api/v1/users', userRoutes_1.default);
}
