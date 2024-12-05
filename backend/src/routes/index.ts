import { Router } from 'express';
import { getData } from '../services/dataService';
import { triggerAllJobs } from '../services/cronService';
import { getKeys } from '../services/keyService';

const router = Router();

/**
 * GET /data
 * Retrieves the collected data.
 */
router.get('/data', (req, res) => {
  try {
    const data = getData();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

/**
 * POST /trigger-jobs
 * Triggers all cron jobs immediately.
 */
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
