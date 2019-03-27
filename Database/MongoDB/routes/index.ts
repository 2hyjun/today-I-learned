import ScreenOn from './ScreenOn';
import Online from './Online';
import AutoDispatch from './AutoDispatch';
import { Router } from 'express';

const AppRouter = Router();

AppRouter.use('/', ScreenOn);
AppRouter.use('/', Online);
AppRouter.use('/', AutoDispatch);

export default AppRouter;
