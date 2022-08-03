const { findRecordById, findRecordByValue } = require('../../utilities/airtable-tools')
const { getGameRecord, getLevelRecord, getSituationDM } = require('../../game-tools')
const { red, blue, magenta, yellow, divider, gray, darkgray, cyan } = require('../../utilities/mk-loggers')

module.exports = async ({ command, client, say, ack }) => {
    await ack()
    red(`user ${command.user_id} has requested game 1\n${JSON.stringify(command, null, 4)}`)
    await say(`OK <@${command.user_id}>, let's play. I'll see you in your DMs in a second.`)
    const gameRecord = await getGameRecord("Game1")
    // darkgray(divider, "gameRecord", gameRecord)
    const firstLevelRecord = await getLevelRecord(gameRecord.fields.FirstLevel[0])
    // darkgray(divider, "firstLevelRecord",firstLevelRecord)
    const situationDM = await getSituationDM(firstLevelRecord.fields.FirstSituation[0], command.user_id)
    await client.chat.postMessage(situationDM)
}