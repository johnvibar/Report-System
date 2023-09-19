import { createRateLimiter } from '../apiRateLimiter';

export default (app) => {
  app.post(
    `/auth/sign-in`,
    require('./authSignIn').default,
  );

  app.post(
    `/auth/sign-up`,
    require('./authSignUp').default,
  );

  app.get(`/auth/me`, require('./authMe').default);
};
