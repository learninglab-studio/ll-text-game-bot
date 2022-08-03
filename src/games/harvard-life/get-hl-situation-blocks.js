const { findRecordById, findRecordByValue } = require('../../utilities/airtable-tools')
const { red, blue, magenta, yellow, divider, gray, darkgray, cyan } = require('../../utilities/mk-loggers')

const getHlSituationDM = async (situation) => {
	magenta(situation)
    const blocks = [
        {
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": situation.fields.Title,
				"emoji": true
			}
		},
		{
			"type": "image",
			"image_url": situation.fields.ImageURL ? situation.fields.ImageURL : process.env.DEFAULT_IMAGE,
			"alt_text": situation.fields.Title
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": situation.fields.Text
			}
		},
	]
    for (let index = 0; index < situation.fields.ChoicesAvailable.length; index++) {
        blocks.push({
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": situation.fields.ChoicesButtonText[index]
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": situation.fields.ChoicesButtonText[index],
					"emoji": true
				},
				"value": `${situation.fields.ChoicesLeadsToSituation[index]}`,
				"action_id": "hl_choice_made"
			}
		})
        
    }
    return blocks
}


module.exports = getHlSituationDM