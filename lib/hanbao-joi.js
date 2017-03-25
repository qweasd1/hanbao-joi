/**
 * Created by tony on 3/23/17.
 */
'use strict'

const Joi = require('joi');

const FIELD_TYPE = {
  PK:"pk",
  FK:"fk",
  NORMAL:"normal"
}

// helper method to cretae extension for refer
function createReferExtension(joiType){
  return (joi)=>({
    base:joi[joiType](),
    name:joiType,
    rules:[
      // pk
      {
        name:"pk",
        params:{
          isAutoGenerate:joi.boolean().default(true)
        },
        setup:function (params){
            if(this._flags.pk){
                throw new Error("duplicate pk in this model")
            }
            this._flags.pk = params
            this._flags.fieldType = FIELD_TYPE.PK
        }
      },
      // fk
      {
        name:"fk",
        params:{
          model:joi.string().required(),
          reverse:joi.string().valid("OneOne","OneMany").default("OneMany")
        },
        setup:function (params){
          this._flags.refer = {
            direct:{
              refModel:params.model,
              cardinal:"OneOne",
              refType:"direct",
            },
            reverse:{
              cardinal:params.reverse,
              refType:"reverse"
            }
          }
          
          this._flags.fieldType = FIELD_TYPE.FK
        }
      },
    ]
  })
}

let arrayRefer = (joi)=>({
      base:joi.array(),
      name:"array",
      rules:[
        {
          name:"refer",
          params:{
            config:joi.object({
              model:joi.string(),
              service:joi.string(),
              cardinal:joi.string().valid("OneOne","OneMany").default("OneMany"),
              direction:joi.string().valid("direct").default("direct"),
              refType:joi.string().default((context)=>{
                if(context.model){
                  return "model"
                }
                else if(context.service) {
                  return "service"
                }
                else {
                  throw new Error("you should specify service or model on your refer config")
                }
              },"if model is specify then refType is model, if service is specify then refType is service")
            }).xor("model","service")
          },
          setup:function (params){
            this._flags.refer = params.config
          }
        }
      ]
    })


let hanbaoJoi = Joi.extend(["any","date","number","string"].map(joiType=>createReferExtension(joiType)).concat(arrayRefer))

hanbaoJoi.ObjectId = function (){
  let rule = hanbaoJoi.string().regex(/^[0-9a-fA-F]{24}$/, "objectId")
  rule._type = "objectId"
  return rule;
}


module.exports = hanbaoJoi
module.exports.FIELD_TYPE = FIELD_TYPE