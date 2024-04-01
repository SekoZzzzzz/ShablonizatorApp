const { Block } = require('../models/models');
const Apierror = require('../error/apierror');
const uuid = require('uuid');
const path = require('path');


class BlockController {
   async getAll(req, res, next) {
    try {
      const blocks = await Block.findAll();
      return res.json(blocks);
    } catch (e) {
        next(Apierror.internalServerError(e.message));
    }
  }

   async getById(req, res, next) {
    const id = req.params.id;
    try {
      const block = await Block.findByPk(id);

      if (!block) {
        return next(Apierror.notFound(e.message));
    }

      return res.json(block);
    } catch (e) {
        next(Apierror.internalServerError(e.message));
    }
  }

   async create(req, res, next) {
    const { name_en, name_ru, description, html } = req.body;

    try {
      const newBlock = await Block.create({
        name_en,
        name_ru,
        description,
        html,
      });

      return res.json(block);
    } catch (e) {
        next(Apierror.internalServerError(e.message));
    }
  }

   async update(req, res, next) {
    const id = req.params.id;
    const { name_en, name_ru, description, html } = req.body;

    try {
      const block = await Block.findByPk(id);

      if (!block) {
        return next(Apierror.notFound('Блок не найден'))
    }

      block.name_en = name_en;
      block.name_ru = name_ru;
      block.description = description;
      block.html = html;

      await block.save();
      return res.json(block);
    } catch (e) {
        next(Apierror.internalServerError(e.message));
    }
  }

   async delete(req, res, next) {
    try {
    const id = req.params.id;
    const block = await Block.findByPk(id);
      if (!block) {
        return next(Apierror.notFound('Блок не найден'))
      }

      await block.destroy();
      return res.json({message: 'Блок успешно удалён'});
    } catch (e) {
        next(Apierror.badRequest(e.message));
    }
  }
}

module.exports = new BlockController();