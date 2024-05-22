import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { contactsController } from './controllers/contactsController.js';
import { contactByIdController } from './controllers/contactByIdController.js';
import { globalError } from './middlewares/globalError.js';
import { nonExistentRoute } from './middlewares/nonExistentRoute.js';
import { PORT } from './constants/envConstants.js';

export function setupServer() {
  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', contactsController);
  app.get('/contacts/:contactId', contactByIdController);

  app.use(globalError);
  app.use('*', nonExistentRoute);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
