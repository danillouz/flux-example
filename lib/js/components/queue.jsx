/**
 * @module queue-component
 */

var React = require('react');
var QueueStore = require('../stores/queue');
var QueueItem = require('./queue-item');

/**
 * Retrieves the state from the Queue Store.
 *
 * Private.
 *
 * @return {Object} Queue state
 */
var __getState = function () {
	return {
		isLoading: QueueStore.isLoading(),
		queueData: QueueStore.getData(),
		favoritedItems: QueueStore.getFavoritedItems()
	};
};

// Component.
module.exports = React.createClass({

	/**
	 * Change event handler that updates state.
	 */
	_onChange: function () {
		this.setState(__getState());
	},

	/**
	 * Sets the initial component state.
	 *
	 * @return {Object} state
	 */
	getInitialState: function () {
		return __getState();
	},

	/**
	 * Component did mount hook.
	 *
	 * Registers a change handler with the Queue Store.
	 */
	componentDidMount: function () {
		QueueStore.addChangeListener(this._onChange);
	},

	/**
	 * Component will unmount hook.
	 *
	 * Deregisters an event handler with the Queue Store.
	 */
	componentWillUnmount: function () {
		QueueStore.removeChangeListener(this._onChange);
	},

	/**
	 * Renders the virtual DOM element.
	 *
	 * @return {Object} virtual DOM element
	 */
	render: function () {
		console.log(this.state);

		return (
			<section id="queue-container">
				{
					this.state.isLoading ?
						<span className="loader"><i className="fa fa-cog fa-spin fa-5x"></i></span> : 
						null
				}

				<ul className="queue-data">
					{
						this.state.queueData.map(queueItem => {
							var isFavorited = !!~this.state.favoritedItems.indexOf(queueItem.id);

							return (
								<QueueItem
									key={ queueItem.id }
									favorited={ isFavorited }
									{ ...queueItem }
								/>
							);
						})
					}
				</ul>
			</section>
		);
	}
});
