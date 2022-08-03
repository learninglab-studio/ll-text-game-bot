const { findRecordById, findRecordByValue } = require('../../utilities/airtable-tools')
const { getGameRecord, getLevelRecord } = require('../../game-tools')
const getHlSituationBlocks = require('./get-hl-situation-blocks')
const { red, blue, magenta, yellow, divider, gray, darkgray, cyan } = require('../../utilities/mk-loggers')

module.exports = async ({ command, client, say, ack }) => {
    await ack()
    red(`someone requested Harvard Life\n${JSON.stringify(command, null, 4)}`)
    const firstLevelRecord = await findRecordById({
        baseId: process.env.AIRTABLE_HARVARD_LIFE_BASE,
        table: "Levels",
        recordId: "recbXwPOubaVkmway"
    })
    blue(firstLevelRecord)
    const situation = await findRecordById({
        baseId: process.env.AIRTABLE_HARVARD_LIFE_BASE,
        table: "Situations",
        recordId: firstLevelRecord.fields.InitialSituation[0]
    })
    const firstSituationBlocks = await getHlSituationBlocks(situation)
    darkgray(firstSituationBlocks)
    await client.chat.postMessage({
        blocks: firstSituationBlocks,
        channel: command.user_id,
        text: `this game requires blocks`
    })
}