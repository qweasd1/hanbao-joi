/**
 * Created by tony on 3/23/17.
 */
'use strict'
const joi = require('../lib/index');



// for single value
let t = joi.ObjectId().fk("person")
let objectId = "123456789123456789123456"

console.log(t._flags.refer);


// for array value
console.log(joi.array().refer({model:"person"})._flags.refer);