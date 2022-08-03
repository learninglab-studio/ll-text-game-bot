const { findRecordByValue, findRecordById } = require('../../utilities/airtable-tools')
const { magenta, darkgray, red, gray, yellow, blue, divider } = require('../../utilities/mk-loggers')
const getHlSituationBlocks = require('./get-hl-situation-blocks')

module.exports = async ({ ack, body, payload, client }) => {
    yellow(`handling harvard-life choice`)
    yellow(payload)
    const newSituation = await findRecordById({
        baseId: process.env.AIRTABLE_HARVARD_LIFE_BASE,
        table: "Situations",
        recordId: payload.value
    })
    const newSituationBlocks = await getHlSituationBlocks(newSituation)
    magenta(newSituationBlocks)
    await client.chat.postMessage({
        blocks: newSituationBlocks,
        channel: body.user.id,
        text: `this game requires blocks`
    })
}
