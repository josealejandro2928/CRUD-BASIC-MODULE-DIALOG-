//startRemplace
 function run(schema){  
  let result = `/**
    @param {*} data
    {`
  let index = 0;
  for(let key in schema){
      if(schema[key]){
        if(index == 0){
          result+= `\n\t\t${key}:${schema[key].type}\n`

        }else{
          result+= `\t\t${key}:${schema[key].type}\n`
        }
      }
      index++;
  }
  result+=`\t}
  \t@returns
  \t{
        data: &[name]&
    }
      \n*/`
  return result;
}
//endRemplace
module.exports = async function create(data, t = undefined) {
  let models = global.app.orm.sequelize.models;
  let dataBase = global.app.orm.sequelize;
  /**Prepara el body para la creacion del recurso */
  let body = {...data};
  
  let &[name]& = await models.&[Name]&.create(body,{transaction:t});
  // Devolucion de la funcion
  return {data:&[name]&}
};
