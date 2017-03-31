const Router = require('koa-router');
const resourcesCtrl = require(`../../controllers/api/resources`);
const router = new Router({
  prefix: '/api/resources'
});

router.get('/', resourcesCtrl);

module.exports = router;
