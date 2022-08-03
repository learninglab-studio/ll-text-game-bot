const { blue, darkgray, gray, magenta, yellow, divider, red } = require('../utilities/mk-loggers')
const { getSituationDM } = require("./index")
const hlChoiceRecord = require("./hl-choice-record")

const newSituationDMFromMove = async ({ ack, body, payload, client }) => {
    ack()
    yellow(`newSituationDMFromMove`)
    const choiceRecord = await hlChoiceRecord(payload.value)
    blue(choiceRecord)
    const newSituationDM = await getSituationDM(choiceRecord.fields.GoesToRoom[0], body.user.id)
    magenta(newSituationDM)
    await client.chat.postMessage(newSituationDM)
}

module.exports = newSituationDMFromMove