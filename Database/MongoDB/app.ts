import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import AppRouter from './routes';

const app = express();
const port = 8081;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.MONGO_URL) {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('MONGO DB Connected!'))
    .catch(console.error);
} else {
  console.error('NO MONGO URL ENV!!!');
  process.exit(1);
}

app.use(AppRouter);

app.listen(port, () => {
  console.log('Server Running at port', port);
});
