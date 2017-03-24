# hanbao-joi
an extended version of joi to express model's schema in hanbao


## TODO
* index
* multiple pk
* controll the visibility

## install
```bash
npm install hanbao-joi
```

## Quick Start
```javascript


```


## Document
* support annotation for primary key
* support populate
    * populate type
* support view fields (using tag)
* provide pattern match for model & model fields


## API Reference

* pk([isAutoGenerate]) // setup pk and optionally set it auto increment, default is true
* fk(modelName [, reverseType]) // setup foreign key on model and also specify the reverse model