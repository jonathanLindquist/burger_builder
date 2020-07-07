import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
	// state = {
	// 	ingredients: null,
	// 	price: 0
	// };

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		// ['salad', '1']
	// 		if (param[0] === 'price') {
	// 			price = param[1];
	// 		} else {
	// 			ingredients[param[0]] = +param[1];
	// 		}
	// 	}
	// 	this.setState({
	// 		ingredients: ingredients,
	// 		price: price
	// 	});
	// }

	render() {
		return (
			<div>
				<CheckoutSummary
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
					ingredients={this.props.ings}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					// render={(props) => (
					// 	<ContactData ingredients={this.props.ings} price={this.props.ings} {...props} />
					// )}
					component={ContactData}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients
	}
}

export default connect(mapStateToProps)(Checkout);
