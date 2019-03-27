import { Router } from 'express';
import DriverOnlineLogs from '../models/DriverOnlineLogs';
import { parseBool } from '../utils/parse';

const router = Router();

router.get('/online', async (req, res) => {
  try {
    const rst = await DriverOnlineLogs.find();
    res.json(rst);
  } catch (e) {
    res.json(e);
  }
});

router.post('/online', async (req, res) => {
  try {
    const { id, online, timezone } = req.body;
    console.log(req.body);

    if (typeof id === 'undefined' || typeof timezone === 'undefined' || typeof online === 'undefined') {
      throw new Error('invalid params');
    }
    const isOnline = parseBool(online);
    const parseId = parseInt(id, 10);
    const parseTimezone = parseInt(timezone, 10);

    await DriverOnlineLogs.insertLogs(parseId, parseTimezone, isOnline);
    const rst = await DriverOnlineLogs.find();
    res.json(rst);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete('/online', async (req, res) => {
  try {
    await DriverOnlineLogs.deleteMany({});
    res.status(200).send('good');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
