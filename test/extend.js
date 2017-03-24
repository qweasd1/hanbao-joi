/**
 * Created by tony on 3/23/17.
 */
'use strict'


const joi = require('joi');

console.log(joi.object({
  test:joi.string()
})._inner.children[0]);