import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRouter from './routers/loginRoute';
import consultaRouter from './routers/consultaRoute';
import pessoaRouter from './routers/pessoaRoute';
import dojoRouter from './routers/dojoRoute';
import graduacaoRouter from './routers/graduacaoRoute';
import taxaRouter from './routers/taxaRoute';
import path from 'path';
import { requireAuth } from './middleware/auth';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/tokenManager';

const app = express();

app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/dojos/', requireAuth, dojoRouter);
app.use('/graduacoes/', requireAuth, graduacaoRouter);
app.use('/pessoas/', requireAuth, pessoaRouter);
app.use('/taxas/', requireAuth, taxaRouter);
app.use('/consulta', consultaRouter);


// Rota raiz redireciona para login ou pessoas
app.get('/', (req, res) => {
  const token = req.cookies.authToken;
  if (token) {
    res.redirect('/pessoas');
  } else {
    res.redirect('/login');
  }
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

export default app;
