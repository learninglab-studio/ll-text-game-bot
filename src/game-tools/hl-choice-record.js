const { findRecordByValue, findRecordById } = require('../utilities/airtable-tools')
const { magenta, gray, yellow, blue, divider } = require('../utilities/mk-loggers')

module.exports = async (choiceId) => {
    yellow(`getChoiceRecord`)
    const choiceRecord = await findRecordById({
        baseId: process.env.AIRTABLE_HARVARD_LIFE_BASE,
        table: "Choices",
        recordId: choiceId
    })
    return choiceRecord
}

