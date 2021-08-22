import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import express from 'express';
import uploadConfig from '../config/upload';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/files', express.static(uploadConfig.directory));
routes.use('/sessions', sessionsRouter);
export default routes;
