const Router = require('express')
const router = new Router()
const blockController = require('../controllers/blockController')

router.post('/', blockController.create)
router.get('/', blockController.getAll)
router.get('/', blockController.getById)
router.put(':id', blockController.update)
router.delete(';id', blockController.delete)

module.exports = router