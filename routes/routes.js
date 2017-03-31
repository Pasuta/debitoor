const Router = require('koa-router');
const indexCtrl = require(`../controllers/index.js`);

const users = require(`../routes/api/users`).routes();
const customers = require(`../routes/api/customers`).routes();
const countries = require(`../routes/api/countries`).routes();
const resources = require(`../routes/api/resources`).routes();

const router = new Router();

router.get('/', indexCtrl);
router.use(users, customers, countries, resources);

module.exports = router;
