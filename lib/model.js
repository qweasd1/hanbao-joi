/**
 * Created by tony on 3/24/17.
 */
'use strict'


const joi = require('./hanbao-joi');
const utils = require('hanbao-utils');

class Model{
  constructor(name, joiSchema){
    this.isHanbao = true
    
    if(!joiSchema.isJoi){
      joiSchema =  joi.object(joiSchema)
    }
    
    this._joiSchema = joiSchema
    this.type = joiSchema._flags["fieldType"] || joi.FIELD_TYPE.NORMAL
    
    this.name = name
    this.fieldType = this._joiSchema._type
    this.flags = this._joiSchema._flags
    this.tags = this._joiSchema._tags
    this.fieldList = null
    this.fields = null
    this.pk = undefined
    this.fks = undefined
    this.fkList = undefined
    
    
    
    this._loadFields()
    this._loadPk()
    this._loadFks()
    
  }
  
  
  getFields(pattern){
    return this.fieldList.filter(field=>{
      return utils.patternMatch(field,pattern)
    })
  }
  
  
  _loadFields(){
    if(this.fieldType !== "object"){
      return
    }
    
    if(!this.fields){
      this.fieldList = []
      this.fields = {}
      let innerModel
      for(let rawField of this._joiSchema._inner.children){
        innerModel = this.fields[rawField.key] = new Model(rawField.key,rawField.schema)
        this.fieldList.push(innerModel)
      }
    }
  }
  
  _loadPk(){
    if(this.fieldType !== "object"){
      return
    }
  
    let pk = this.getFields({type:"pk"})
    
    if(pk.length === 1){
       this.pk = pk[0]
    }
    else if(pk.length === 0){
       // no pk
    }
    else {
      throw new Error("more than one pk which is not support by now")
    }
    
  }
  
  _loadFks(){
    if(this.fieldType !== 'object'){
       return
    }
  
    this.fks = this.getFields({type:"fk"})
  }
  
}

module.exports = Model