/**
 * @module queue-server-action-creator
 */

var dispatcher = require('../dispatcher');

// Interface.
module.exports = {
	receiveQueueData: function (data) {
		dispatcher.dispatch({
			type: 'RECEIVING_QUEUE_DATA',
			payload: data
		});
	}
}
