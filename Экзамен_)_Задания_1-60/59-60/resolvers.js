
async function getRecordsByField(object, field, context)
{
    console.log(`debbug ID = ${field}`);
    let records = [];
    if (field)
    {
        records = await context.getOne(object, field);
    }
    else
    {
        records = await context.getAll(object);
    }
    return records;
}
async function deleteRecord(object, id, context)
{
    let target = await context.getOne(object, id);
    context.deleteOne(object, id);
    return target[0];
}
async function mutateRecord(object, idField, fields, context)
{
    return await context.getOne(object, idField)
        .then(async records =>
        {
            let targetRecord = {};
            if (records.length > 0)
            {
                targetRecord = await context.updateOne(object, idField, fields)
                    .then(() => context.getOne(object, idField));
            }
            else
            {
                delete fields[Object.keys(fields).find(field => fields[field] === idField)];
                targetRecord = await context.insertOne(object, fields);
            }
            return targetRecord[0];
        });
}
module.exports =
{
    getStudent: async (args, context) =>
    {
        const {Student, id} = args;
        console.log(args);
        return id ?
            await context.query(
                `SELECT * FROM Student
                    WHERE IdStudent = ${id};`
            ) : await getRecordsByField('Student', Student, context);
    },
    setStudent: (args, context) =>
    {
        console.log(args);
        let fields = {
            IdStudent: args.student.IdStudent, 
            Name: args.student.Name, 
            Sername: args.student.Sername, 
            Mark: args.student.Mark
        };
        return mutateRecord('Student', fields.IdStudent, fields, context);
    },
    delStudent: (args, context) => deleteRecord('Student', args.id, context)
}