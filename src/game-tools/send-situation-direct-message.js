const { findRecordById, findRecordByValue } = require('../utilities/airtable-tools')
const { red, blue, magenta, yellow, divider, gray, darkgray, cyan } = require('../utilities/mk-loggers')

const sendSituationDM = async (situationId, userId) => {
    const situationResult = await findRecordById({
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
    return {
        blocks: blocks
    }
}


module.exports = sendSituationDM