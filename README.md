1- Primero es definir como luce nuestro modelo por ejemplo definamos "Worker",
definimos una especie de "JSON" donde las llaves son los campos del modelo,
en nuestra BD y los valores son una simbologia para determinar, primero el tipo de dato,
luego, requerimeintos EJ: + => es requerido, @ => es correo , ** =>password, img => imagen,
bool => boleano, json => es un json, date y dateonly => son de datos.
Ponemos hide si no lo queremos mostrar en una tabla de records.
Ponemos no-create si no lo queremops incluir en el modal de creacion.
Si queremos que un campo de texto dea de tipo textarea y no input ponemos long.
Si queremos un campo de texto que sea de tipo traduccion ponemos trans.
Si queremos que un campo de texto sea de con un editor de texto enriquesido como ckeditor ponemos ck.

<!-- Worker{
    avatar: img 
    name: '' + 
    lastName: '' + 
    age: 12 + 
    birthday: dateonly
    email: '' @ + u
    CompanyId: Company + s=name 
    Tasks: [Task] s=title hide
    status: |a|b|c|
    card: '' **
    description: json trans ck
} -->

2- El nombre del archivo .json debe llamarse struct.json
