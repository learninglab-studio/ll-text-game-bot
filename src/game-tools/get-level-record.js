const { findRecordByValue } = require('../utilities/airtable-tools')
const { magenta, gray, yellow, blue, divider } = require('../utilities/mk-loggers')

module.exports = async (levelId) => {
    const levelRecord = await findRecordById({
        baseId: process.env.AIRTABLE_TEXT_GAME_BASE,
        table: "Levels",
        recordId: levelId
    })
    return levelRecord
}

