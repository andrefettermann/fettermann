"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const apiRoute_1 = __importDefault(require("./api/apiRoute"));
const pessoaRoute_1 = __importDefault(require("./routers/pessoaRoute"));
const dojoRoute_1 = __importDefault(require("./routers/dojoRoute"));
const graduacaoRoute_1 = __importDefault(require("./routers/graduacaoRoute"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api/', apiRoute_1.default);
app.use('/dojos/', dojoRoute_1.default);
app.use('/graduacoes/', graduacaoRoute_1.default);
app.use('/pessoas/', pessoaRoute_1.default);
//app.use((req: Request, res: Response, next: NextFunction) => {
//   res.send("Hello World");
//})
app.use((error, req, res, next) => {
    res.status(500).send(error.message);
});
exports.default = app;
