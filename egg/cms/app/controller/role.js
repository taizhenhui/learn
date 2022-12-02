
'use strict';

const BaseController  = require('./base');
class Controller extends BaseController{
  constructor(...args){
    super(...args)
    this.entity = 'role'
  }
}

module.exports = Controller
