# hanbao-joi
an extended version of joi to express model's schema in hanbao


## TODO
* index
* [optional] multiple pk
* controll the visibility


## install
```bash
npm install hanbao-joi
```

## Design
* we let user to explicit create model use hanbao-joi's model
* all field meta should store on ._flags in raw joi object
* move properties on joi object to hanbao's Model object to support better strucutre pattern match


## Document
* support annotation for primary key
* support populate
    * populate type
* support view fields (using tag)
* provide pattern match for model & model fields


## API Reference

* pk([isAutoGenerate]) // setup pk and optionally set it auto increment, default is true
* fk(modelName [, reverseType]) // setup foreign key on model and also specify the reverse model