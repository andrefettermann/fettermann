
import dotenv from 'dotenv';
import app from './app';
import {db} from './db'

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

db.then(() => {
    app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
});
