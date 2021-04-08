'use strict';

  //startRemplace
  function run(schema){  
    for(let key in schema){
        if(schema[key].isPassword){
            return `const bcrypt = require('bcryptjs');`
        }
    }
    return '';
  }
  //endRemplace
exports.loadModel = function loadModel() {
    let orm = global.app.orm;
    const &[Name]& = orm.sequelize.define('&[Name]&',
       {...orm.mixins.attributes,
        id: {
            type: orm.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    //startRemplace
        function run(schema){  
            let result = '';
            for(let key in schema){
                if(schema[key].type == "REFERENCE" && schema[key].isMultiple ){
                    result += '';
                }else{
                    result += `"${key}":{ \n \t`;
                }
                switch (schema[key].type) {
                    case "STRING":
                        result+=`"type":orm.Sequelize.STRING, \n \t`;
                        break;
                    case "LONG-STRING":
                        result+=`"type":orm.Sequelize.TEXT('long'), \n \t`;
                        break;
                    case "IMAGE":
                        result+=`"type":orm.Sequelize.STRING, \n \t`;
                        break;
                    case "BOOLEAN":
                        result+=`"type":orm.Sequelize.BOOLEAN, \n \t`;
                        break;
                    case "JSON":
                        result+=`"type":orm.Sequelize.TEXT('long'), 
                        "set": function (value) {
                            this.setDataValue('${key}', JSON.stringify(value));
                        },
                        "get": function () {
                            var data = this.getDataValue('${key}');
                            if (data) {
                                if (typeof data !== 'object') {
                                    var i = JSON.parse(data);
                                    return i;
                                } else {
                                    return data;
                                }
                            } else {
                                return {};
                            }
                        },`;
                        break;
                    
                    case "DATE":
                        result+=`"type":orm.Sequelize.DATE, \n \t`;
                    break;
                    case "DATEONLY":
                        result+=`"type":orm.Sequelize.DATEONLY, \n \t`;
                    break;
                    case "NUMBER":
                        if(schema[key].isDecimal){
                            result+=`"type":orm.Sequelize.DOUBLE, \n \t`;
                        }else{
                            result+=`"type":orm.Sequelize.INTEGER, \n \t`;
                        }
                    break;
                    case "ENUM":
                        result+=`"type":orm.Sequelize.ENUM,
                        "values":${JSON.stringify(schema[key].values)},
                        "defaultValue": "${schema[key].values[0]}",`;
                    break;
                    case "REFERENCE":
                        if(!schema[key].isMultiple){
                            result+=`"type":orm.Sequelize.INTEGER,\t
                            "references": {
                                "model": "${schema[key].targetTable}",
                                "key": "id"
                            },
                            "onUpdate": "cascade",
                            "onDelete": "cascade",`
                        }
                    break;
                }
                if(schema[key].type == "REFERENCE" && schema[key].isMultiple ){
                    result += '';
                }else{
                    if(schema[key].isRequired){
                        result+=`"allowNull":false,\n\t`;
                    }
                    if(schema[key].isEmail){
                        result+=`"isEmail":true,\n\t`;
                    }
                    if(schema[key].unique){
                        result+=`"unique":true,\n\t`;
                    }
                    if(schema[key].isPassword){
                        result+=`set: function (_new${key}) {
                            var rounds = 8;
                            var hashed${key} = bcrypt.hashSync(_new${key}, rounds);
                            this.setDataValue('${key}', hashed${key});
                        }`
                    }
                    result +=`}\n,`
                }
            }
            return result;
        } 
    //endRemplace
        }, {
            comment: 'A example model.',
            freezeTableName: true,
            tableName: '&[Name]&',
            hooks: {

            }
        });
    &[Name]&.associate = function () {
        const models = orm.sequelize.models;
        //startRemplace
         function run(schema){  
            let result = '';
            for(let key in schema){
                if(schema[key].type == 'REFERENCE'){
                    if(!schema[key].isMultiple){
                        result+= `models.&[Name]&.belongsTo(models.${schema[key].targetTable}, {
                            as: '${key.split('Id')[0]}'
                            });`
                    }else{
                        if(schema[key].oneToMany){
                            result+= `models.&[Name]&.hasMany(models.${schema[key].targetTable}, {
                                as: '${key}'
                                });`
                        }
                        if(schema[key].manyToMany){
                            result+= `models.&[Name]&.belongsToMany(models.${schema[key].targetTable}, {
                                as: '${key}',
                                through: '${schema[key].throughTable}'
                                });`
                        }
                       
                    }
                }
            }
            return result;
        }
        //endRemplace
    }

};