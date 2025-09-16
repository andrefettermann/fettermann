"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
const realmClient_1 = require("./realmClient");
dotenv_1.default.config();
const PORT = parseInt(`${process.env.PORT || 3000}`);
db_1.db.then(() => {
    app_1.default.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
});
(0, realmClient_1.login)("", "").then((u) => {
    //console.log(`Conectado ao Atlas MongoDB com o usuario ${u.id}`)
});
