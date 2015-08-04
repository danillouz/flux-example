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
		queueData: QueueStore.getQueueData(),
		isLoading: QueueStore.isLoading()
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
		return (
			<div className="queue-container">
				{ this.state.isLoading ? <span>loading queue data..</span> : null }

				<ul className="queue-data">
					{
						this.state.queueData.map(queueItem => <QueueItem key={ 'something' + queueItem.id} { ...queueItem } />)
					}
				</ul>
			</div>
		);
	}
});
