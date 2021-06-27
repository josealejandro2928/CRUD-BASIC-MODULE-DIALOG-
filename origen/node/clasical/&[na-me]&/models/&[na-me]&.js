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
    const sequelize = global.app.orm.sequelize;
    const DataTypes = global.app.orm.Sequelize;

    const &[Name]& = sequelize.define('&[Name]&',
       {...orm.mixins.attributes,
        id: {
            type: DataTypes.INTEGER,
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
                        result+=`"type":DataTypes.STRING, \n \t`;
                        break;
                    case "LONG-STRING":
                        result+=`"type":DataTypes.TEXT('long'), \n \t`;
                        break;
                    case "IMAGE":
                        result+=`"type":DataTypes.STRING, \n \t`;
                        break;
                    case "BOOLEAN":
                        result+=`"type":DataTypes.BOOLEAN, \n \t`;
                        break;
                    case "JSON":
                        result+=`"type":DataTypes.TEXT('long'), 
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
                        result+=`"type":DataTypes.DATE, \n \t`;
                    break;
                    case "DATEONLY":
                        result+=`"type":DataTypes.DATEONLY, \n \t`;
                    break;
                    case "NUMBER":
                        if(schema[key].isDecimal){
                            result+=`"type":DataTypes.DOUBLE, \n \t`;
                        }else{
                            result+=`"type":DataTypes.INTEGER, \n \t`;
                        }
                    break;
                    case "ENUM":
                        result+=`"type":DataTypes.ENUM,
                        "values":${JSON.stringify(schema[key].values)},
                        "defaultValue": "${schema[key].values[0]}",`;
                    break;
                    case "REFERENCE":
                        if(!schema[key].isMultiple){
                            result+=`"type":DataTypes.INTEGER,\t
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