const airtableTools = require('../utilities/airtable-tools')

module.exports = async ({ payload, ack, client }) => {
    console.log("got a choice");
    await ack()
    console.log(JSON.stringify(payload, null, 4));
    console.log(`looking for ${payload.value}`)
    const theUser = payload.value.split("___")[0]
    const theChoice = payload.value.split("___")[1]
    console.log(`looking for ${theChoice} in the Choices table`)
    const choiceResult = await airtableTools.findOneById({
        baseId: process.env.AIRTABLE_TEXT_GAME_BASE,
        table: "Choices",
        recordId: theChoice
    })

    const blocks = await getSituationBlocks(choiceResult.fields.GoesToRoom[0], theUser)

    await client.chat.postMessage({
        channel: theUser,
        blocks: blocks,
        text: "this game requires blocks"
    })
}

const getSituationBlocks = async (situationId, userId) => {
    const situationResult = await airtableTools.findOneById({
        baseId: process.env.AIRTABLE_TEXT_GAME_BASE,
        table: "Situations",
        recordId: situationId
    })
    const blocks = [
        {
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": situationResult.fields.Name,
				"emoji": true
			}
		},
		{
			"type": "image",
			"image_url": situationResult.fields.Image,
			"alt_text": situationResult.fields.Name
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": situationResult.fields.Text
			}
		}
	]
    console.log(`checking for choices`)
    console.log(JSON.stringify(situationResult, null, 4))
    if (situationResult.fields.Choices) {
        for (let index = 0; index < situationResult.fields.Choices.length; index++) {
            const element = situationResult.fields.Choices[index];
            blocks.push({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": situationResult.fields.ChoicesText[index]
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": situationResult.fields.ChoicesText[index],
                        "emoji": true
                    },
                    "value": `${userId}___${element}`,
                    "action_id": "choice_made"
                }
            })
            
        }
    }
    
    return blocks
}




// const situationResult = await airtableTools.findOneById({
//     baseId: process.env.AIRTABLE_TEXT_GAME_BASE,
//     table: "Situations",
//     recordId: theSituation
// })
// console.log(`SITUATION RESULT\n${JSON.stringify(situationResult, null, 4)}`)
// const blocks = [
//     {
//         "type": "header",
//         "text": {
//             "type": "plain_text",
//             "text": situationResult.fields.Name,
//             "emoji": true
//         }
//     },
//     {
//         "type": "image",
//         "image_url": situationResult.fields.Image,
//         "alt_text": situationResult.fields.Name
//     },
//     {
//         "type": "section",
//         "text": {
//             "type": "mrkdwn",
//             "text": situationResult.fields.Text
//         }
//     }
// ]