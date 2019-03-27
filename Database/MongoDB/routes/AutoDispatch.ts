import { Router } from 'express';
import DriverAutoDispatch from '../models/DriverAutoDispatchLogs';
import { parseBool } from '../utils/parse';

const router = Router();

router.get('/auto_dispatch', async (req, res) => {
  try {
    const rst = await DriverAutoDispatch.find();
    res.json(rst);
  } catch (e) {
    res.json(e);
  }
});

router.post('/auto_dispatch', async (req, res) => {
  try {
    const { id, auto_dispatch, timezone } = req.body;
    console.log(req.body);

    if (typeof id === 'undefined' || typeof auto_dispatch === 'undefined' || typeof timezone === 'undefined') {
      throw new Error('invalid params');
    }
    const isOnline = parseBool(auto_dispatch);
    const parseId = parseInt(id, 10);
    const parseTimezone = parseInt(timezone, 10);

    await DriverAutoDispatch.insertLogs(parseId, parseTimezone, isOnline);
    const rst = await DriverAutoDispatch.find();
    res.json(rst);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete('/auto_dispatch', async (req, res) => {
  try {
    await DriverAutoDispatch.deleteMany({});
    res.status(200).send('good');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
