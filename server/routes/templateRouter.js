const Router = require('express')
const router = new Router()
const templateController = require('../controllers/templateController')

router.post('/', templateController.create)
router.get('/', templateController.getAll)
router.get('/', templateController.getOne)
router.put(':id', templateController.update)
router.delete(';id', templateController.delete)

module.exports = router