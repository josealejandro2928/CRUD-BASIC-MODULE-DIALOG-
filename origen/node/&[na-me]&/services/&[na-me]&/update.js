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

module.exports = async function update(data, id, t = undefined) {
  let models = global.app.orm.sequelize.models;
  let dataBase = global.app.orm.sequelize;
  let updateBody = { ...data };
  await models.&[Name]&.update(updateBody, { where:{id:id } , transaction: t });
  let &[name]& =  await models.&[Name]&.findByPk(id,{transaction:t});
  return &[name]&;
};
