const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/todos')

router.get('/', Ctrl.findAll)
router.post('/', Ctrl.create)
router.post('/:id', Ctrl.update)
router.delete('/:id', Ctrl.destroy)

module.exports = router.routes()
