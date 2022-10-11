import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import validateLoginUser from '../middlewares/validateLoginUser';
import AuthController from '../controllers/AuthController';
import validateToken from '../middlewares/validateToken';

const router = Router();
const authController = new AuthController();

router.post(
  '/',
  validateLogin,
  validateLoginUser,
  authController.login,
);
router.get('/validate', validateToken, authController.validate);

export default router;
