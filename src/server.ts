
import dotenv from 'dotenv';
import app from './app';
import { db } from './db'
import { User } from 'realm-web';
import { login, logout } from './realmClient';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

db.then(() => {
    app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
});

login("", "").then((u: User) => {
    //console.log(`Conectado ao Atlas MongoDB com o usuario ${u.id}`)
})