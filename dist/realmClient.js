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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.login = login;
exports.getLoggedInUser = getLoggedInUser;
exports.logout = logout;
// src/services/realmClient.ts
const Realm = __importStar(require("realm-web"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new Realm.App({ id: process.env.ATLAS_APP_ID });
let currentUser = null;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.isLoggedIn) {
            return currentUser;
        }
        const credentials = Realm.Credentials.apiKey(process.env.ATLAS_API_KEY);
        //Realm.Credentials.emailPassword(email, password);
        currentUser = yield app.logIn(credentials);
        console.log(`🟢 Usuário autenticado: ${currentUser.id}`);
        return currentUser;
    });
}
function getLoggedInUser() {
    if (!currentUser || !currentUser.isLoggedIn) {
        throw new Error("Usuário não autenticado");
    }
    return currentUser;
}
function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentUser && currentUser.isLoggedIn) {
            yield currentUser.logOut();
            console.log("🔒 Usuário desconectado");
            currentUser = null;
        }
        else {
            console.warn("⚠️ Nenhum usuário logado para fazer logout");
        }
    });
}
