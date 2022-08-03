const { findRecordById, findRecordByValue } = require('../utilities/airtable-tools')
const { red, blue, magenta, yellow, divider, gray, darkgray, cyan } = require('../utilities/mk-loggers')

const getSituationDM = async (situationId, userId) => {
	red(`getting situation DM`)
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
			"image_url": situationResult.fields.Image ? situationResult.fields.Image : process.env.DEFAULT_IMAGE,
			"alt_text": situationResult.fields.Name
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": situationResult.fields.Text
			}
		},
	]
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
					"value": `${element}`,
					"action_id": "tg_choice_made"
				}
			})
			
		}
	}
	// red(blocks)
    return {
        blocks: blocks,
        channel: userId,
        text: `this game requires blocks`
    }
}


module.exports = getSituationDM