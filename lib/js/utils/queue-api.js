/**
 * @module queue-web-api-util
 */

var QueueServerAction = require('../actions/queue-server');

// Interface.
module.exports = {

	/**
	 * Simulates fetching data from a server.
	 */
	fetch: function () {

		// Simulate fetching data from a server.
		setTimeout(function () {
			QueueServerAction.receiveQueueData([
				{
					id: 1,
					name: 'item one'
				},

				{
					id: 2,
					name: 'item two'
				},

				{
					id: 3,
					name: 'item three'
				}
			]);
		}, 2000)
	}
};
