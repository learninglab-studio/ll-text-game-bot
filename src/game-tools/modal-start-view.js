module.exports = ( gameInfo, trigger_id ) => {

    const blocks = [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Welcome to a modal with _blocks_'
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click me!'
            },
            action_id: 'button_abc'
          }
        },
        {
          type: 'input',
          block_id: 'input_c',
          label: {
            type: 'plain_text',
            text: 'What are your hopes and dreams?'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'dreamy_input',
            multiline: true
          }
        }
      ]
    return {
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: trigger_id,
        // View payload
        view: {
          type: 'modal',
          // View identifier
          callback_id: 'view_1',
          title: {
            type: 'plain_text',
            text: 'Modal title'
          },
          blocks: blocks,
          submit: {
            type: 'plain_text',
            text: 'Submit'
          }
        }
      }
}

