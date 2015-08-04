/**
 * @module queue-action-creator
 */

var dispatcher = require('../dispatcher');
var queueAPI = require('../utils/queue-api');

// Interface.
module.exports = {

	/**
	 * Action initiator to fetch queue data from a server.
	 *
	 * Dispatches action and delegates to the queue web API utility to actually
	 * fetch the queue data.
	 */
	fetchQueueData: function () {
		dispatcher.dispatch({
			type: 'FETCHING_QUEUE_DATA'
		});

		queueAPI.fetch();
	}
};
