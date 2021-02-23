import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { eventController } from './controllers/event.controller';

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(eventController);

app.listen(+PORT, (e: Error) => {
  e ? console.error(e) : console.log(`Listening on port ${PORT}`);
});
