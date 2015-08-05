/**
 * @module queue-action
 *
 * Action Creator.
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
	},

	/**
	 * Favorites a queue item.
	 *
	 * @param  {string} itemId - queue item identifier
	 */
	favoriteItem: function (itemId) {
		dispatcher.dispatch({
			type: 'FAVORITE_QUEUE_ITEM',
			payload: itemId
		});
	},

	/**
	 * Un favorites a queue item.
	 *
	 * @param  {string} itemId - queue item identifier
	 */
	unFavoriteItem: function (itemId) {
		dispatcher.dispatch({
			type: 'UN_FAVORITE_QUEUE_ITEM',
			payload: itemId
		});
	}
};
