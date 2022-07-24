const { findRecordByValue } = require('../utilities/airtable-tools')
const { magenta, gray, yellow, blue, divider } = require('../utilities/mk-loggers')


module.exports = async ( nameOfTheGame ) => {
    const queryOptions = {
        baseId: process.env.AIRTABLE_TEXT_GAME_BASE,
        table: "Games",
        value: nameOfTheGame,
        field: "Name"
    }
    const gameRecord = await findRecordByValue(queryOptions)
    return gameRecord
}