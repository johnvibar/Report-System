export default (app) => {
  app.put(`/order/:id`, require('./orderUpdate').default);
  app.get(`/order`, require('./orderList').default);
  app.get(`/order/:id`, require('./orderFind').default);
};
