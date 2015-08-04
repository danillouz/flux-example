/**
 * @module queue-item
 */

var React = require('react');

// Component.
module.exports = React.createClass({

	/**
	 * Renders the virtual DOM element.
	 *
	 * @return {Object} virtual DOM element
	 */
	render: function () {
		return (
			<li className="queue-data-item" data-id={ this.props.id }>
				{ this.props.name }
			</li>
		);
	}
});
