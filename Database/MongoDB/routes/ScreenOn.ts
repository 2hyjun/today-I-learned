import { Router } from 'express';
import { DriverLocation } from '../models/DriverLocation';
const router = Router();

router.get('/screen_on', async (req, res) => {
  const id = req.get('id');
  if (id) {
    try {
      const rst = await DriverLocation.findByDriverId(parseInt(id));
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

  // DriverLocation.findByDriverId(1).then(console.log)
  try {
    await DriverLocation.createLogs(id, 100, 'hello');
    res.send('good');
  } catch (e) {
    console.log(e);
    res.send('bad');
  }
});

router.delete('/screen_on', (req, res) => {
  DriverLocation.deleteMany({})
    .then(() => {
      res.send('good');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

export default router;
