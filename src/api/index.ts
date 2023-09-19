import { authMiddleware } from '../middlewares/authMiddleware';
import { contentType } from 'mime-types';
import { createRateLimiter } from './apiRateLimiter';
import * as fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

const app = express();

// Enables CORS
app.use(cors());

//Configures the authentication middleware
//to set the currentUser to the requests
app.use(authMiddleware);

//Default rate limiter
const defaultRateLimiter = createRateLimiter({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'errors.429',
});
app.use(defaultRateLimiter);

// Enables Helmet, a set of tools to
// increase security.
const cspDirectives = {
  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  'script-src': ["'self'", "'unsafe-eval'"],
};

// console.log('----- Content Security Policy -----');
// console.log(cspDirectives);

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        ...cspDirectives,
      },
    },
  }),
);

// Parses the body of POST/PUT request
// to JSON
app.use(bodyParser.json());

// Configure the Entity routes
const routes = express.Router();

require('./auth').default(routes);
require('./order').default(routes);
require('./delivery').default(routes);

// Add the routes to the /api endpoint
app.use('/api', routes);

const mimes = {
  '.css': 'text/css',
  '.js': 'text/javascript',
};

//For compressed files
app.get(
  ['*.css', '*.jpeg', '*.jpg', '*.js', '*.png', '*.svg'],
  (req, res, next) => {
    const gzUrl = path.resolve(
      __dirname,
      `../../frontend/build/${req.url}.gz`,
    );

    // only if file exists
    if (!fs.existsSync(gzUrl)) {
      return next();
    }

    res.set('Content-Encoding', 'gzip');
    const ext = path.extname(req.url);
    const ctnType =
      mimes[ext] ||
      contentType(ext) ||
      'application/octet-stream';
    res.set('Content-Type', ctnType);
    res.sendFile(gzUrl);
  },
);

app.use(
  express.static(
    path.resolve(__dirname, '../../frontend/build'),
  ),
);

app.get('*', function (req, res) {
  res.sendFile(
    path.resolve(
      __dirname,
      '../../frontend/build',
      'index.html',
    ),
  );
});

export default app;
