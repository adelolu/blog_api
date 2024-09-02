"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = __importDefault(require("./comment"));
const auth_1 = __importDefault(require("./auth"));
const post_1 = __importDefault(require("./post"));
const like_1 = __importDefault(require("./like"));
const user_1 = __importDefault(require("./user"));
exports.default = (router) => {
    (0, auth_1.default)(router);
    (0, post_1.default)(router);
    (0, like_1.default)(router);
    (0, user_1.default)(router);
    (0, comment_1.default)(router);
};
// router.all("/");
// export default (app: Router) => app.use("/", router);
//# sourceMappingURL=index.js.map