import React from 'react';


const ShoppingCartItem = (props) => {
    console.log('props from cart item', props)
    return (
        <div>
            <div className='product-container'>
                <h3>{props.product.design}</h3>
                <img src={props.product.url} />
                <h3>${props.product.price}</h3>
                <button onClick={() => props.removeFromCart(props.product)}>Remove Item</button>
            </div>
        </div>
    )
}



export default ShoppingCartItem;