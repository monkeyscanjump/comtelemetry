import { Router } from 'express';
import { getData } from '../services/dataService';
import { triggerAllJobs } from '../services/cronService';
import { getKeys } from '../services/keyService';

const router = Router();

// DATA API.
router.get('/data', (req, res) => {
  res.json(getData());
});

// Trigger all cron jobs
router.post('/trigger-jobs', async (req, res) => {
  try {
    await triggerAllJobs(getKeys());
    res.json({ message: 'All jobs triggered successfully' });
  } catch (error) {
    console.error('Error triggering jobs:', error);
    res.status(500).json({ error: 'Failed to trigger jobs' });
  }
});

export default router;