"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = defaultRoutes;
const express_1 = require("express");
const routes_1 = __importDefault(require("./routes"));
function defaultRoutes(app) {
    // version 1
    const router = (0, express_1.Router)();
    (0, routes_1.default)(router);
    app.use("/", router);
    // 404 Error Handler
    app.all("*", (req, res) => {
        res.status(404).json({
            status: false,
            error: "Page not found",
        });
    });
}
//# sourceMappingURL=main.js.map