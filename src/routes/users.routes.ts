import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const returnedUser = await createUser.execute({
      name,
      email,
      password,
    });

    const user = { ...returnedUser, password: undefined };

    return response.json({ user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatarUser = new UpdateUserAvatarService();

    if (!request.file) {
      throw new Error('The image file is required');
    }

    const _user = await updateAvatarUser.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const user = { ..._user, password: undefined };

    return response.json(user);
  },
);

export default usersRouter;
