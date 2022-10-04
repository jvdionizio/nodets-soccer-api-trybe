import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import validateLoginUser from '../middlewares/validateLoginUser';
import AuthController from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

router.post(
  '/',
  validateLogin,
  validateLoginUser,
  authController.login,
);

export default router;
