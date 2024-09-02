"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccess = exports.isLoggedin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const isLoggedin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "login required", status: false });
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, "secretKey");
        if (!verifyToken) {
            return res
                .status(401)
                .json({ message: "Unauthorised Access", status: false });
        }
        const existuser = yield user_1.default.findById(verifyToken._id);
        if (!existuser) {
            return res.status(401).json({ message: "unauthorzied", status: false });
        }
        req.user = existuser;
        next();
    }
    catch (error) {
        res.status(401).json({ message: error, status: false });
    }
});
exports.isLoggedin = isLoggedin;
const verifyAccess = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ message: "login required", status: false });
            }
            const verifyToken = jsonwebtoken_1.default.verify(token, "secretKey");
            // console.log(verifyToken);
            if (!verifyToken) {
                return res
                    .status(401)
                    .json({ message: "Unauthorised Access", status: false });
            }
            const user = yield user_1.default.findById(verifyToken._id);
            // console.log(user);
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized access", status: false });
            }
            req.user = user;
            // console.log(req.user, "current user");
            if (!roles.includes(req.user.role)) {
                return res
                    .status(403)
                    .json({ message: "Action is forbidden", status: false });
            }
            // console.log(user);
            next();
        }
        catch (error) {
            res.status(500).json({ message: error, status: false });
        }
    });
};
exports.verifyAccess = verifyAccess;
//# sourceMappingURL=auth.js.map