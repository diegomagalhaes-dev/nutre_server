import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();

    const { user: _user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const user = { ..._user, password: undefined };

    return response.json({ user, token });
  } );

export default sessionsRouter;
