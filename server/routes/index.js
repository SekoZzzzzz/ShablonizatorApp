const Router = require('express')
const router = new Router()

const templateRouter = require('./templateRouter')
const blockRouter = require('./blockRouter')
const template_blockRouter = require('./templateblockRouter')
const block_placeholderRouter = require('./templateblockRouter')

router.use('/template', templateRouter)
router.use('/block', blockRouter)
router.use('/template_block', template_blockRouter)
router.use('/block_placeholder', block_placeholderRouter)

module.exports = router