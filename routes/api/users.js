const Router = require('koa-router');
const usersCtrl = require(`../../controllers/api/users`);
const router = new Router({
  prefix: '/api/users'
});

router.get('/', usersCtrl.getAll);
router.get('/:id', usersCtrl.findById);

module.exports = router;
