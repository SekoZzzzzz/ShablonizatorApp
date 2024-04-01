const {Template} = require('../models/models');
const Apierror = require('../error/apierror');
const uuid = require('uuid');
const path = require('path');

class TemplateController {
    async create(req, res, next){
        try{
            let {name_en, name_ru, description} = req.body;
            const template = await Template.create({
                name_en, name_ru, description
            });
            return res.json(template);
        }catch (e){
            next(Apierror.badRequest(e.message))
        }
    }
    async getAll(req, res){
        try{
            let {kindId, viewId, limit, page} = req.query;
            page = page || 1;
            limit = limit || 6;
            let offset = page * limit - limit;
            let templates;
            if(!kindId && !viewId){
                templates = await Template.findAndCountAll({ limit, offset });
            } else if (!kindId && viewId){
                templates = await Template.findAndCountAll({ where: {kindId}, limit, offset});
            } else if (kindId && !viewId) {
                templates = await Template.findAndCountAll({ where: {viewId}, limit, offset});
            } else if (kindId && viewId){
                templates = await Template.findAndCountAll({where: {kindId, viewId}, limit, offset});
            }
            return res.json(templates);
        }catch(e){
            next(Apierror.internalServerError(e.message));
        }
    }
    async getOne(req, res, next){
        try{
            const { id } = req.params;
            const template = await Template.findByPk(id);
            if (!template){
                return next(Apierror.notFound(e.message));
            }
            return res.json(template)
        } catch (e) {
            next(Apierror.internalServerError(e.message));
        }
    }
    async update(req, res, next){
        try{
            const { id } = req.params;
            const {
                name_en, name_ru, description
            } = req.body;
            const template = await Template.findByPk(id);

            if (!template){
                return next(Apierror.notFound('Шаблон не найден'))
            }
            template.name_en = name_en;
            template.name_ru = name_ru;
            template.description = description;
            await template.save()
            return res.json(template);
        } catch(e){
            next(Apierror.internalServerError(e.message));
        } 
    }
    async delete(res, req, next){
        try{
            const {id} = req.params;
            const template = await Template.findByPk(id);
            if (!template){
                return next(Apierror.notFound('Шаблон не найден'))
            }
            await template.destroy();

            return res.json({message: 'Шаблон успешно удалён'});
        } catch (e){
            next(Apierror.badRequest(e.message));
        }
    }
}
module.exports = new TemplateController();