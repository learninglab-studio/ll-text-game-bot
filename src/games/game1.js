const airtableTools = require('../utilities/airtable-tools')
const { getGameInfo } = require('../game-tools')


module.exports = async ({ command, client, say, ack }) => {
    await ack()
    const gameResult = await airtableTools.findOneByValue({
        baseId: process.env.AIRTABLE_TEXT_GAME_BASE,
        table: "Games",
        value: "Game1",
        field: "Name"
    })
    console.log(`someone requested game 1\n${JSON.stringify(command, null, 4)}`)
    console.log(JSON.stringify(gameResult, null, 4))
    await say(`OK <@${command.user_id}>, let's play. I'll see you in your DMs in a second.`)
    const situationBlocks = await getSituationBlocks(gameResult.fields.FirstRoom[0], command.user_id)
    await client.chat.postMessage({
        channel: command.user_id,
        blocks: situationBlocks,
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
		},
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Farmhouse",
                        "emoji": true
                    },
                    "value": "click_me_123"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Kin Khao",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "url": "https://google.com"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Ler Ros",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "url": "https://google.com"
                }
            ]
        }
	]
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
    return blocks
}


