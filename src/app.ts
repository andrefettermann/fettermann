import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import apiRouter from './routers/apiRoute';
import pessoaRouter from './routers/pessoaRoute';
import dojoRouter from './routers/dojoRoute';
import graduacaoRouter from './routers/graduacaoRoute';
import path from 'path';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

 app.use(express.static(path.join(__dirname, 'public')));

app.use('/dojos/', dojoRouter);
app.use('/graduacoes/', graduacaoRouter);
app.use('/pessoas/', pessoaRouter);

app.use('/api/', apiRouter);

//app.use((req: Request, res: Response, next: NextFunction) => {
//   res.send("Hello World");
//})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

export default app;
