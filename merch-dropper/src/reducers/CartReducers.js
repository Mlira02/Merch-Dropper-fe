import { ADD_CART_PRODUCT, REMOVE_CART_PRODUCT, TOGGLE_CART_HIDDEN } from '../actions';
import initialState from './initialState';

const addProductToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

const removeProductFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? {
        ...cartItem, quantity: cartItem.quantity - 1
    } : cartItem
    )
}



const CartReducer = (state = initialState, action) => {
    let cart = state.cart;
    // console.log('current cart state', cart)

    switch (action.type) {

        case ADD_CART_PRODUCT:
            return {
                ...state,
                cart: addProductToCart(state.cart, action.payload),
                error: '' //What is this for, Jennie?
            };

        case REMOVE_CART_PRODUCT:
            return {
                ...state,
                // cart: cart.filter(item => item.id !== action.payload)
                cart: removeProductFromCart(state.cart, action.payload)
            };

        case TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };

        default:
            return state;
    }
};

export default CartReducer;