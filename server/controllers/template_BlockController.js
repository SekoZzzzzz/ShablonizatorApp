const { Template_block } = require('../models/models');
const Apierror = require('../error/apierror');
const uuid = require('uuid');
const path = require('path');


class Template_blockController {
   async getAll(req, res, next) {
    try {
      const templateblocks = await Template_block.findAll();
      return res.json(templateblocks);
    } catch (e) {
        next(Apierror.internalServerError(e.message));
    }
  }

   async getById(req, res, next) {
    const id = req.params.id;

    try {
      const temaplateblock = await Template_block.findByPk(id);

      if (!temaplateblock) {
        return next(Apierror.notFound(e.message));
    }

      return res.json(temaplateblock);
    } catch (e) {
        next(Apierror.internalServerError(e.message));
    }
  }

   async create(req, res, next) {
    const { order_count, templateId, blockId } = req.body;
    try {
      const newTemplateBlock = await Template_block.create({
        order_count,
        templateId,
        blockId,
      });

      return res.json(block);
    } catch (e) {
        next(Apierror.internalServerError(e.message));
    }
  }

   async update(req, res, next) {
    const id = req.params.id;
    const { order_count, templateId, blockId } = req.body;

    try {
      const templateblock = await Template_block.findByPk(id);

      if (!templateblock) {
        return next(Apierror.notFound('Блок не найден'))
    }

      templateblock.order_count = order_count;
      templateblock.templateId = templateId;
      templateblock.blockId = blockId;

      await templateblock.save();
      return res.json(templateblock);
    } catch (e) {
        next(Apierror.internalServerError(e.message));
    }
  }

   async delete(req, res, next) {
    try {
    const id = req.params.id;
    const templateblock = await Template_block.findByPk(id);
      if (!block) {
        return next(Apierror.notFound('Блок не найден'))
      }

      await templateblock.destroy();
      return res.json({message: 'Блок успешно удалён'});
    } catch (e) {
        next(Apierror.badRequest(e.message));
    }
  }
}

module.exports = new Template_blockController();