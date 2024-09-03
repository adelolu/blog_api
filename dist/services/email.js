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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = require("handlebars");
const html_to_text_1 = require("html-to-text");
class Email {
    constructor() {
        this.user = process.env.USER_EMAIL;
        this.password = process.env.USER_PASSWORD;
        this.from = `Blog <${process.env.USER_EMAIL}>`;
    }
    newTransport() {
        return nodemailer_1.default.createTransport({
            service: "gmail",
            port: 567,
            secure: false,
            auth: {
                user: this.user,
                pass: this.password,
            },
        });
    }
    sendHtml(to, template, subject, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlTemplate = fs_1.default.readFileSync(path_1.default.join(__dirname, `../../templates/${template}.html`), "utf-8");
            const html = (0, handlebars_1.compile)(htmlTemplate)(data);
            const mailOptions = {
                from: this.from,
                to,
                subject,
                html,
                text: (0, html_to_text_1.convert)(html),
            };
            yield this.newTransport().sendMail(mailOptions);
        });
    }
    sendWelcome(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendHtml(user.email, "welcome", `Welcome to my Blog`, {
                firstName: user.firstname,
                lastName: user.lastname,
            });
        });
    }
    sendPasswordReset(user, resetLink) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendHtml(user.email, "resetpassword", "Password Reset Request", {
                firstName: user.firstname,
                lastName: user.lastname,
                resetLink,
            });
        });
    }
}
exports.default = Email;
//# sourceMappingURL=email.js.map