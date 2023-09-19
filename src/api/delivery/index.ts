export default (app) => {
  app.get(`/delivery`, require('./deliveryList').default);
};
