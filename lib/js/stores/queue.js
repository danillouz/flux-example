/**
 * @module queue-store
 */

var EventEmitter = require('events').EventEmitter;
var ObjectAssign = require('object-assign');
var dispatcher = require('../dispatcher');

// Constants.
var CHANGE_EVENT = 'change';

// Private.
var __queue__ = [];
var __favorited__ = [];
var __isLoading__ = false;

/**
 * Stores the queue data.
 *
 * Private.
 *
 * @param {Array} data - queue data
 */
var __storeQueueData = function (data) {
	__queue__ = data;
};

/**
 * Stores a favorited queue item id.
 *
 * Private
 *
 * @param  {string} itemId - queue item identifier
 */
var __favoriteQueueItem = function (itemId) {
	__favorited__.push(itemId);
};

/**
 * Removes a favorited queue item id.
 *
 * Private
 *
 * @param  {string} itemId - queue item identifier
 */
var __unFavoriteQueueItem = function (itemId) {
	var index = __favorited__.indexOf(itemId);
	var match = !!~index;

	if (match) {
		__favorited__.splice(index, 1);
	}
};

// Public interface.
var QueueStore = ObjectAssign({}, EventEmitter.prototype, {

	/**
	 * Registers a change listener with the store.
	 *
	 * @param {Function} callback - event handler to be registered
	 */
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Deregisters a change listener with the store.
	 *
	 * @param  {Function} callback - registered event handler
	 */
	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	/**
	 * Emits a change event to all registered (controller) views.
	 */
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * Retrieves the stores loading state.
	 *
	 * @return {Boolean} loading state
	 */
	isLoading: function () {
		return __isLoading__;
	},

	/**
	 * Retrieves the queue data.
	 *
	 * @return {Object} queue data
	 */
	getData: function () {
		return __queue__;
	},

	/**
	 * Retrieves the favorited queue items.
	 *
	 * @return {Array} favorited queue items
	 */
	getFavoritedItems: function () {
		return __favorited__;
	}
});

/**
 * Queue Store dispatch token.
 *
 * After registering the store with the dispatcher, a unique token is returned to identify the
 * store in question when managing dependencies between other stores.
 */
QueueStore.dispatchToken = dispatcher.register(function (action) {
	switch (action.type) {
		case 'FETCHING_QUEUE_DATA': {
			__isLoading__ = true;

			QueueStore.emitChange();

			break;
		}

		case 'RECEIVING_QUEUE_DATA': {
			__storeQueueData(action.payload);
			__isLoading__ = false;

			QueueStore.emitChange();

			break;
		}

		case 'FAVORITE_QUEUE_ITEM': {
			__favoriteQueueItem(action.payload);

			QueueStore.emitChange();

			break;
		}

		case 'UN_FAVORITE_QUEUE_ITEM': {
			__unFavoriteQueueItem(action.payload);

			QueueStore.emitChange();

			break;
		}
	}
});

// Export.
module.exports = QueueStore;
