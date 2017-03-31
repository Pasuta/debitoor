const Router = require('koa-router');
const countriesCtrl = require(`../../controllers/api/countries`);
const router = new Router({
  prefix: '/api/countries'
});

router.get('/', countriesCtrl.getAll);
router.get('/:id', countriesCtrl.findById);

module.exports = router;
