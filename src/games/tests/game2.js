const { getGameInfo, initSession, modalStartView } = require('../../game-tools')
const { findRecordById, findRecordByValue } = require('../../utilities/airtable-tools')
const { magenta, gray, yellow, blue, divider, red } = require('../../utilities/mk-loggers')

module.exports = async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();
    yellow(body)
    const gameInfo = await getGameInfo({nameOfTheGame: "Game2"});
    magenta(gameInfo)
    try {
      // Call views.open with the built-in client
      const theView = await modalStartView(gameInfo, body.trigger_id)
      red(theView)
      const result = await client.views.open(theView);
      // logger.info(result);
    }
    catch (error) {
      logger.error(error);
    }
  }