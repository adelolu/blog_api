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
exports.Login = exports.Signup = void 0;
const authModel_1 = require("../db/authModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: "input cannot be empty", status: false });
        }
        else {
            const existuser = yield authModel_1.usermodel.findOne({ email: email });
            console.log(existuser);
            if (existuser) {
                res.status(400).json({ message: "user already exist", status: false });
            }
            else {
                let hashpassword = yield bcryptjs_1.default.hash(password, 10);
                let token = '';
                const newuser = yield authModel_1.usermodel.create({
                    username,
                    email,
                    password: hashpassword,
                    token
                });
                if (newuser) {
                    res.status(201).json({ message: "signup successful", status: true });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, status: false });
    }
});
exports.Signup = Signup;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send({ message: "input cannot be empty", status: false });
        }
        else {
            const existuser = yield authModel_1.usermodel.findOne({ email: email });
            console.log(existuser, 'login');
            if (!existuser) {
                res
                    .status(400)
                    .send({ message: "Account does not exist", status: false });
            }
            else {
                let correctpassword = yield bcryptjs_1.default.compare(password, existuser.password);
                if (correctpassword === true) {
                    const token = yield jsonwebtoken_1.default.sign({ email }, "secretKey", {
                        expiresIn: "1d",
                    });
                    console.log(token);
                    res
                        .status(200)
                        .send({ message: "login successful", status: true, token });
                }
                else {
                    res
                        .status(400)
                        .send({ message: "Incorrect password", status: false });
                }
            }
        }
    }
    catch (error) {
        res.status(500).send({ message: error.message, status: false });
    }
});
exports.Login = Login;
