/**
 * @module queue-item
 */

var React = require('react');
var QueueAction = require('../actions/queue');

// Component.
module.exports = React.createClass({

	/**
	 * Click handler that handles favorite action.
	 *
	 * @param {Object} event - event Object
	 */
	handleFavorite: function (event) {
		var itemId = event.currentTarget.value;

		if (this.props.favorited) {
			QueueAction.unFavoriteItem(itemId);
		} else {
			QueueAction.favoriteItem(itemId);
		}
	},

	/**
	 * Renders the virtual DOM element.
	 *
	 * @return {Object} virtual DOM element
	 */
	render: function () {
		return (
			<li className={ 'queue-data-item' + (this.props.favorited ? ' favorited' : '') }>
				{ this.props.name }

				<button className="fav-button" onClick={ this.handleFavorite } value={ this.props.id }>
					<i className={ 'fa' + (this.props.favorited ? ' fa-star' : ' fa-star-o') + ' fa-3x' } />
				</button>
			</li>
		);
	}
});
