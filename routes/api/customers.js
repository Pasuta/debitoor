const Router = require('koa-router');
const customersCtrl = require(`../../controllers/api/customers`);
const router = new Router({
  prefix: '/api/customers'
});

router.get('/', customersCtrl.getAll);
router.get('/:id', customersCtrl.findById);

module.exports = router;
