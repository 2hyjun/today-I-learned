import { Router } from 'express';
import DriverScreenLogs from '../models/DriverScreenLogs';
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
  const { id } = req.body;
  // console.log('header', req.header);

  // DriverScreenLogs.findByDriverId(1).then(console.log)
  try {
    await DriverScreenLogs.insertLogs(
      id,
      100,
      require('moment')()
        .utc()
        .toISOString()
    );
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

router.put('/screen_on', async (req, res) => {
  const { id, timezone } = req.body;
  try {
    const rst = await DriverScreenLogs.extractLogs(timezone);
    res.send(rst);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
