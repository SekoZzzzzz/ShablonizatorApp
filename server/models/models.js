const sequelize = require('../db')
const {DataTypes, STRING, TEXT, INTEGER} = require('sequelize')

const Template = sequelize.define('template',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_en:{type: STRING},
    name_ru:{type: STRING},
    description:{type: STRING},
})

const Block = sequelize.define('block', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name_en: {type: STRING},
    name_ru: {type: STRING},
    description: {type: STRING},
    html: {type: TEXT},
})

const Block_placeholder = sequelize.define('block_placeholder', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING},
    expected_data_type: {type: STRING}
})

const Template_block = sequelize.define('template_block',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    order_count: {type: INTEGER},
})
const TemplateBlock = sequelize.define('templateblock',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},

})
Block.hasMany(Block_placeholder)
Block_placeholder.belongsTo(Block)

Template.belongsToMany(Template_block, {through: TemplateBlock})
Template_block.belongsToMany(Template, {through: TemplateBlock})

Block.belongsToMany(Template_block, {through: TemplateBlock})
Template_block.belongsToMany(Block, {through: TemplateBlock})

module.exports = {
    Template,
    Block,
    Template_block,
    Block_placeholder,
    TemplateBlock
}