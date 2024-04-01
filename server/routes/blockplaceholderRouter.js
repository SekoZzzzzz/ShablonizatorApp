const Router = require('express')
const router = new Router()
const block_placeholderController = require('../controllers/blockController')

router.post('/', block_placeholderController.create)
router.get('/', block_placeholderController.getAll)
router.get('/', block_placeholderController.getById)
router.put(':id', block_placeholderController.update)
router.delete(';id', block_placeholderController.delete)

module.exports = router