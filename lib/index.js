/**
 * Created by tony on 3/24/17.
 */
'use strict'
module.exports = require('./hanbao-joi')
const Model = require('./model');
module.exports.model = function (name,joiSchema){
    return new Model(name,joiSchema)
}