/**
 * @module queue-server-action
 *
 * Server Action Creator.
 */

var dispatcher = require('../dispatcher');

// Interface.
module.exports = {

	/**
	 * Receives queue data.
	 *
	 * @param  {Array} data - queue data
	 */
	receiveQueueData: function (data) {
		dispatcher.dispatch({
			type: 'RECEIVING_QUEUE_DATA',
			payload: data
		});
	}
};
