"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usermodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// let bcrypt = require("bcryptjs");
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        // minLength: [5, "password cant be short"],
        select: false
    },
    token: {
        type: String,
        required: true,
        select: false
    },
});
// let saltRound = 1;
// userSchema.pre("save", function (next) {
//   console.log(this);
//   bcrypt
//     .hash(this.password, saltRound)
//     .then((password) => {
//       console.log(password);
//       this.password = password;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
exports.usermodel = mongoose_1.default.model("user_collection", userSchema);
