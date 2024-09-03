"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.resetPassword = exports.forgotPassword = exports.tokenVerification = exports.loginAdmin = exports.createAdmin = exports.loginUser = exports.createUser = void 0;
const user_1 = __importStar(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = __importDefault(require("../services/email"));
function generateToken(_id, email) {
    return jsonwebtoken_1.default.sign({ _id, email }, "secretKey", {
        expiresIn: "1d",
    });
}
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstname, lastname, date_of_birth, gender, bio, role, email, password, } = req.body;
        if (!username) {
            return res
                .status(400)
                .json({ message: "username cannot be empty", status: false });
        }
        else if (!email) {
            return res
                .status(400)
                .json({ message: "email cannot be empty", status: false });
        }
        else if (!password) {
            return res
                .status(400)
                .json({ message: "password cannot be empty", status: false });
        }
        else if (!firstname) {
            return res
                .status(400)
                .json({ message: "firstname cannot be empty", status: false });
        }
        else if (!lastname) {
            return res
                .status(400)
                .json({ message: "lastname cannot be empty", status: false });
        }
        else if (!gender) {
            return res
                .status(400)
                .json({ message: "gender cannot be empty", status: false });
        }
        else if (!date_of_birth) {
            return res
                .status(400)
                .json({ message: "date of birth cannot be empty", status: false });
        }
        else if (!role) {
            return res
                .status(400)
                .json({ message: "role cannot be empty", status: false });
        }
        const existuser = yield user_1.default.findOne({ email });
        if (existuser) {
            return res
                .status(400)
                .json({ message: "user already exist", status: false });
        }
        if (role === user_1.UserRoles.admin) {
            return res
                .status(403)
                .json({ message: "Action forbidden", status: false });
        }
        let hashpassword = yield bcrypt_1.default.hash(password, 10);
        const newuser = yield user_1.default.create({
            firstname,
            lastname,
            username,
            email,
            password: hashpassword,
            gender,
            date_of_birth,
            bio,
            role,
        });
        if (!newuser) {
            return res
                .status(400)
                .json({ message: "signup unsuccessful", status: false });
        }
        newuser.set("password", undefined);
        const token = generateToken(newuser.id, email);
        yield new email_1.default().sendWelcome(newuser);
        res
            .status(201)
            .json({ message: "signup successful", token, newuser, status: true });
    }
    catch (error) {
        res.status(500).json({ message: error, status: false });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({ message: "email cannot be empty", status: false });
        }
        else if (!password) {
            return res
                .status(400)
                .json({ message: "password cannot be empty", status: false });
        }
        const existuser = yield user_1.default.findOne({ email }, "+password");
        if (!existuser) {
            return res
                .status(400)
                .json({ message: "Account does not exist", status: false });
        }
        let correctpassword = yield bcrypt_1.default.compare(password, existuser.password);
        if (!correctpassword) {
            return res
                .status(400)
                .json({ message: "Incorrect password", status: false });
        }
        existuser.set("password", undefined);
        const token = generateToken(existuser.id, email);
        res.status(200).json({
            message: "login successful",
            status: true,
            token,
            user: existuser,
        });
    }
    catch (error) {
        res.status(500).json({ message: error, status: false });
    }
});
exports.loginUser = loginUser;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstname, lastname, date_of_birth, gender, bio, email, password, } = req.body;
        if (!username) {
            return res
                .status(400)
                .json({ message: "username cannot be empty", status: false });
        }
        else if (!email) {
            return res
                .status(400)
                .json({ message: "email cannot be empty", status: false });
        }
        else if (!password) {
            return res
                .status(400)
                .json({ message: "password cannot be empty", status: false });
        }
        else if (!firstname) {
            return res
                .status(400)
                .json({ message: "firstname cannot be empty", status: false });
        }
        else if (!lastname) {
            return res
                .status(400)
                .json({ message: "lastname cannot be empty", status: false });
        }
        const existuser = yield user_1.default.findOne({ email });
        if (existuser) {
            return res
                .status(400)
                .json({ message: "user already exist", status: false });
        }
        console.log(req.user);
        // if (role === UserRoles.admin && req.user.role === UserRoles.admin) {
        //   return res
        //     .status(403)
        //     .json({ message: "Action forbidden", status: false });
        // }
        let hashpassword = yield bcrypt_1.default.hash(password, 10);
        const newuser = yield user_1.default.create({
            firstname,
            lastname,
            username,
            email,
            password: hashpassword,
            gender,
            date_of_birth,
            bio,
            role: user_1.UserRoles.admin,
        });
        if (!newuser) {
            return res
                .status(400)
                .json({ message: "Admin not created", status: false });
        }
        newuser.set("password", undefined);
        res
            .status(201)
            .json({ message: "Admin created successful", newuser, status: true });
    }
    catch (error) {
        res.status(500).json({ message: error, status: false });
    }
});
exports.createAdmin = createAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({ message: "email cannot be empty", status: false });
        }
        else if (!password) {
            return res
                .status(400)
                .json({ message: "password cannot be empty", status: false });
        }
        const existadmin = yield user_1.default.findOne({ email }, "+password");
        if (!existadmin) {
            return res
                .status(400)
                .json({ message: "Account does not exist", status: false });
        }
        let correctpassword = yield bcrypt_1.default.compare(password, existadmin.password);
        if (!correctpassword) {
            return res
                .status(400)
                .json({ message: "Incorrect password", status: false });
        }
        existadmin.set("password", undefined);
        const token = generateToken(existadmin.id, email);
        res.status(200).json({
            message: "login successful",
            status: true,
            token,
            admin: existadmin,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error, status: false });
    }
});
exports.loginAdmin = loginAdmin;
//check
const tokenVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "invalid token", status: false });
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, "secretKey");
        const verifyuser = yield user_1.default.findById(verifyToken._id);
        if (!verifyuser || verifyuser.id !== id) {
            return res
                .status(401)
                .json({ message: "Unauthorized acess", status: false });
        }
        res.status(200).json({ message: "user is verified", status: true });
    }
    catch (error) {
        res.status(500).json({ message: error, status: false });
    }
});
exports.tokenVerification = tokenVerification;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_1.default.findOne(email);
        if (!user) {
            return res
                .status(400)
                .json({ message: "User does not exist", status: false });
        }
        const token = crypto_1.default.randomBytes(20).toString("hex");
        const now = new Date();
        user.recoveryCode = token;
        user.recoveryCodeExpiry = new Date(now.getTime() + 60 * 60000); // 1 hour from now
        yield user.save();
        const resetLink = `${process.env.WEBSITE}/reset-password?token=${token}`;
        yield new email_1.default().sendPasswordReset(user, resetLink);
        res.status(200).json({ message: "Reset link sent", status: true });
    }
    catch (error) {
        res.status(500).json({ message: error, status: false });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        const user = yield user_1.default.findOne({
            recoveryCode: token,
            recoveryCodeExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(401).json({
                message: "Password reset token is invalid or has expired.",
                status: false,
            });
        }
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        user.password = hashpassword;
        user.set("recoveryCode", undefined);
        user.set("recoveryCodeExpiry", undefined);
        // user.recoveryCode = "";
        // user.recoveryCodeExpiry = undefined
        yield user.save();
        res.status(200).json({ message: "Password has been reset", status: true });
    }
    catch (error) {
        res.status(500).json({ message: error, status: false });
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.js.map