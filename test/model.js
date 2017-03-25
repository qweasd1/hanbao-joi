/**
 * Created by tony on 3/23/17.
 */
'use strict'

const Model = require('../lib/model');
const joi = require('../lib/hanbao-joi');

let m  = new Model("person",{
  _id:joi.ObjectId().pk(),
  name:joi.string(),
  age:joi.number(),
  products:joi.any().fk("products").tags(["admin","normal"]),
  others:joi.array()
})


console.log(m.fks);

