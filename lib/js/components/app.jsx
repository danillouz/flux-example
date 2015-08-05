/**
 * @module app-component
 */

var React = require('react');
var QueueAction = require('../actions/queue');
var FavCounter = require('./fav-counter');
var Queue = require('./queue');

// Component
module.exports = React.createClass({

	/**
	 * Component will mount hook.
	 *
	 * Fetches the queue data.
	 */
	componentWillMount: function () {
		QueueAction.fetchQueueData();
	},

	/**
	 * Renders the virtual DOM element.
	 *
	 * @return {Object} virtual DOM element
	 */
	render: function () {
		return (
			<section id="application-container">
				<FavCounter />

				<Queue />
			</section>
		);
	}
});
