import { Router } from 'express';
import DriverScreenLogs from '../models/DriverScreenLogs';
import moment from 'moment';
const router = Router();

router.get('/screen_on', async (req, res) => {
  const id = req.get('id');
  if (id) {
    try {
      const rst = await DriverScreenLogs.find();
      console.log(rst);
      res.json(rst);
    } catch (e) {
      res.send('bad');
    }
  } else {
    res.send('no id');
  }
});

router.post('/screen_on', async (req, res) => {
  const { id, timezone } = req.body;
  // console.log('header', req.header);

  // DriverScreenLogs.findByDriverId(1).then(console.log)
  try {
    await DriverScreenLogs.insertLogs(id, 100, moment().format(), parseInt(timezone, 10), new Date().getTime());
    const rst = await DriverScreenLogs.find();
    res.send(rst);
  } catch (e) {
    console.log(e);
    res.send('bad');
  }
});

router.delete('/screen_on', (req, res) => {
  DriverScreenLogs.deleteMany({})
    .then(() => {
      res.send('good');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.post('/custom_log', async (req, res) => {
  const { id, timezone, timestamp, on_time, screen } = req.body;
  const driver = await DriverScreenLogs.findOne({ driver_id: id });
  const prevLogs = driver ? driver.screen_logs : [];
  prevLogs.push({ on_time: parseInt(on_time, 10), screen, timestamp: parseInt(timestamp, 10) });
  try {
    await DriverScreenLogs.findOneAndUpdate({ driver_id: id }, { screen_logs: prevLogs, timezone }, { upsert: true });
    res.send('good');
  } catch (e) {
    console.error(e);
    res.send('bad');
  }
});

router.post('/driver/screen_on', (req, res) => {
  console.log('---------------------------------------------------');
  console.log(JSON.stringify(req.body, null, 2));
  console.log('---------------------------------------------------');
  res.status(200).json({});
});

export default router;
