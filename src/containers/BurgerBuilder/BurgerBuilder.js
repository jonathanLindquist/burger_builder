import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
	// This is an alternate that works as well
	// constructor(props) {
	//     super(props);
	//     this.state = {

	//     }
	// }

	state = {
		///// local UI state
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		console.log(this.props);
		// axios
		// 	.get('https://burger-builder-backend-159db.firebaseio.com/ingredients.json')
		// 	.then((response) => {
		// 		this.setState({
		// 			ingredients: response.data
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		this.setState({
		// 			error: true
		// 		});
		// 	});
	}

	isPurchasable = (ingredients) => {
		// const ingredients = {
		// 	...this.state.ingredients
		// };

		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		// this.setState({ purchaseable: sum > 0 });
		return sum > 0;
	};

	// addIngredientHandler = (type) => {
	// 	// UPDATE INGREDIENTS
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = updatedCount;

	// 	// UPDATE PRICE
	// 	const priceAddition = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice + priceAddition;

	// 	this.setState({
	// 		ingredients: updatedIngredients,
	// 		totalPrice: newPrice
	// 	});

	// 	this.isPurchasable(updatedIngredients);
	// };

	// removeIngredientHandler = (type) => {
	// 	// UPDATE INGREDIENTS
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const updatedCount = oldCount - 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = updatedCount;

	// 	// UPDATE PRICE
	// 	const priceReduction = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - priceReduction;

	// 	this.setState({
	// 		ingredients: updatedIngredients,
	// 		totalPrice: newPrice
	// 	});

	// 	this.isPurchasable(updatedIngredients);
	// };

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelhandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		// }
		// queryParams.push('price=' + this.state.totalPrice);
		// const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout'
			// search: '?' + queryString
		});
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />;

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						disabled={disabledInfo}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						price={this.props.price}
						purchaseable={this.isPurchasable(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCanceled={this.purchaseCancelhandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelhandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
		onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
