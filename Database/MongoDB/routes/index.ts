import ScreenOn from './ScreenOn';
import { Router } from 'express';

const AppRouter = Router();

AppRouter.use('/', ScreenOn);

export default AppRouter;