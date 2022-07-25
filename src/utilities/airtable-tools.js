const Airtable = require('airtable')

// module.exports.saveOneRecord = async ({ record, table, base }) => {
//     const base = Airtable.base('');
//     return `saved your record`
// }

module.exports.findRecordByValue = async ({ baseId, table, field, value, view }) => {
    var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(baseId);
    theRecords = [];
    await base(table).select({
        maxRecords: 1,
        view: view ? view : "Grid view",
        filterByFormula: `${field}='${value}'`
    }).eachPage(function page(records, next){
        theRecords.push(...records);
        next()
      })
      // .then(()=>{
      //   // return(theRecords);
      // })
      .catch(err=>{console.error(err); return})
    // console.log(JSON.stringify(theRecords))
    return theRecords[0];
}

module.exports.findRecordById = async function({ baseId, table, recordId }) {
  console.log(`looking for ${recordId} in ${table} in ${baseId}`)  
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(baseId);
    var result = await base(table)
      .find(recordId)
      .catch(err=>{console.error(err); return});
    console.log(JSON.stringify(result, null, 4))
    return result;
  }