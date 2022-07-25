const { blue, darkgray, gray, magenta, yellow, divider, red } = require('../utilities/mk-loggers')
const { getSituationDM, getChoiceRecord } = require("./index")

const newSituationDMFromMove = async ({ ack, body, payload, client }) => {
    ack()
    const choiceRecord = await getChoiceRecord(payload.value)
    const newSituationDM = await getSituationDM(choiceRecord.fields.GoesToRoom[0], body.user.id)
    await client.chat.postMessage(newSituationDM)
}

module.exports = newSituationDMFromMove