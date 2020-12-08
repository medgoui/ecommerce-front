import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelper';

const Card = ({ product, showViewProductButton = true, showAddtoCartButton = true, cartUpdate = false, showRemoveProductButton = false, setRun = f => f, run = undefined }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCartButton = () => {

        return (
            showAddtoCartButton &&
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                <i className="fad fa-shopping-cart"></i> Add to cart
            </button>
        );
    };

    const showRemoveButton = showRemoveProductButton => {

        return (
            showRemoveProductButton && (
                <button onClick={() => { removeItem(product._id); setRun(!run) }} className="btn btn-outline-danger mt-2 mb-2">
                    Remove Product
                </button>
            ));
    };

    const showStock = quantity => {
        return quantity > 0 ?
            (<span className="badge badge-primary badge-pill">In Stock</span>) :
            (<span className="badge badge-primary badge-danger">Out Of Stock</span>)
    }

    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        Adjust Quantity
                    </span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        </div>
    }

    const showColorSize = category => (
        category === 'Clothing' ? <div className="options d-flex flex-fill">
            <select className="custom-select mr-1">
                <option>Color</option>
                <option value="1">Green</option>
                <option value="2">Blue</option>
                <option value="3">Red</option>
            </select>
            <select className="custom-select ml-1">
                <option>Size</option>
                <option value="1">41</option>
                <option value="2">42</option>
                <option value="3">43</option>
            </select>
        </div> : null
    );

    return (
        <div className="card">
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text">{product.description.substring(0, 100)}</p>
                {showColorSize(product.category.name)}
                <div className="buy d-flex justify-content-between align-items-center">
                    <div className="price text-success"><h5 className="mt-4">{product.price}$</h5></div>
                    {showAddToCartButton()}
                </div>
                <br />
                <div className="row">
                    <div className="col-2">
                        {showStock(product.quantity)}
                    </div>
                    <p className="col-4"></p>
                    <p className="col-6">Added {moment(product.createdAt).fromNow()}</p>
                </div>
                {showViewProductButton &&
                    <div className="card-footer">
                        <Link to={`/product/${product._id}`}>
                            <button className="btn btn-outline-primary btn-block">
                                View Product
                        </button>
                        </Link>
                    </div>
                }
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    )
}

export default Card;