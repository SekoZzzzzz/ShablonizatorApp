const Router = require('express')
const template_blockController = require('../controllers/template_BlockController')
const router = new Router()

router.post('/', template_blockController.create)
router.get('/', template_blockController.getAll)
router.get('/', template_blockController.getById)
router.put(':id', template_blockController.update)
router.delete(';id', template_blockController.delete)

module.exports = router