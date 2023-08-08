const parkRouter = require('./parkRouter.js')
const googleRouter = require('./googleRouter.js')


module.exports = (app) => {
  app.use("/parks", parkRouter);
  app.use("/auth/google", googleRouter); //Google Authentication
};



