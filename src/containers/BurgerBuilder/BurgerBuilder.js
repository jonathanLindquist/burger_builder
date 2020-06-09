import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 1.7
};

class BurgerBuilder extends Component {
	// This is an alternate that works as well
	// constructor(props) {
	//     super(props);
	//     this.state = {

	//     }
	// }

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchaseable: false
	};

	updatePurchaseState = (ingredients) => {
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

		this.setState({purchaseable: sum > 0});
	};

	addIngredientHandler = (type) => {
		// UPDATE INGREDIENTS
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		// UPDATE PRICE
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		// UPDATE INGREDIENTS
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		// UPDATE PRICE
		const priceReduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceReduction;

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
        });
        
        this.updatePurchaseState(updatedIngredients);
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<Aux>
				<div>
					<Burger ingredients={this.state.ingredients} />
				</div>
				<BuildControls
					disabled={disabledInfo}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
