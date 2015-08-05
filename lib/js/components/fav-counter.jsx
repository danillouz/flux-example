/**
 * @module fav-counter-component
 */

var React = require('react');
var QueueStore = require('../stores/queue');

/**
 * Retrieves the state from the Queue Store.
 *
 * Private.
 *
 * @return {Object} Queue state
 */
var __getState = function () {
	return {
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
		return (
			<section id="fav-counter">
				<span className="counter">{ this.state.favoritedItems.length }</span> favorited
			</section>
		);
	}
});
