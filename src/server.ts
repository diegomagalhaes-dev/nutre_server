import express from 'express';
import 'reflect-metadata';

import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3332, () => {
  console.log('Server started on port 3332');
});
