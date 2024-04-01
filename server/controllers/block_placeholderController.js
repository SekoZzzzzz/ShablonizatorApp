const {Block_placeholder} = require('../models/models');
const Apierror = require('../error/apierror');
const uuid = require('uuid');
const path = require('path');

class Block_placeholderController {
    async create(req, res, next){
        try{
            let {name, expected_data_types, blockId} = req.body;
            const block_placeholder = await Block_placeholder.create({
                name, expected_data_types, blockId
            });
            return res.json(block_placeholder);
        }catch (e){
            next(Apierror.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
          const block_placeholders = await Block_placeholder.findAll();
          return res.json(block_placeholders);
        } catch (e) {
            next(Apierror.internalServerError(e.message));
        }
      }
      async getById(req, res, next) {
        const id = req.params.id;
        try {
          const block_placeholder = await Block_placeholder.findByPk(id);
    
          if (!block_placeholder) {
            return next(Apierror.notFound(e.message));
        }
    
          return res.json(block_placeholder);
        } catch (e) {
            next(Apierror.internalServerError(e.message));
        }
      }
    async update(req, res, next){
        try{
            const { id } = req.params;
            const {
                name, expected_data_types, blockId
            } = req.body;
            const block_placeholder = await Block_placeholder.findByPk(id);

            if (!block_placeholder){
                return next(Apierror.notFound('Плейсхолдер не найден'))
            }
            block_placeholder.name = name;
            block_placeholder.expected_data_types = expected_data_types;
            block_placeholder.blockId = blockId;

            await block_placeholder.save()
            return res.json(block_placeholder);
        } catch(e){
            next(Apierror.internalServerError(e.message));
        } 
    }
    async delete(res, req, next){
        try{
            const {id} = req.params;
            const block_placeholder = await Block_placeholder.findByPk(id);
            if (!block_placeholder){
                return next(Apierror.notFound('Плейсхолдер не найден'))
            }
            await block_placeholder.destroy();

            return res.json({message: 'Плейсхолдер успешно удалён'});
        } catch (e){
            next(Apierror.badRequest(e.message));
        }
    }
}
module.exports = new Block_placeholderController();