// test
import { setup } from 'simple-route';

import apiRoutes from './routes/api.js';

await setup({
  title: 'Feedback API',
  version: '1.0.0',
  trusted: ['https://developfeedback.covercrop-data.org/', 'https://feedback.covercrop-data.org/'],
  plugins: {
    v1: apiRoutes,
  },
});
