"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserRoles = {
    author: "author",
    admin: "admin",
    user: "user",
};
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: Object.values(exports.UserRoles),
        default: exports.UserRoles.user,
    },
    bio: {
        type: String,
        default: "",
    },
    profileImage: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    date_of_birth: Date,
    gender: String,
    recoveryCode: String,
    recoveryCodeExpiry: Date,
    verificationCode: String,
    verificationCodeExpiry: Date,
});
exports.default = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=user.js.map