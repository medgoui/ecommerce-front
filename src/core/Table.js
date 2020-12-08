import React from 'react';
import ShowImage from './ShowImage';

const Table = ({ products }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="row">Item</th>
                        <th scope="row">Price</th>
                        <th scope="row">Qte</th>
                        <th scope="row">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i) => (
                            <tr key={i}>
                                <td scope="col"><ShowImage item={product} url="product" /></td>
                                <td scope="col">{product.price}$</td>
                                <td scope="col">{product.count}</td>
                                <td scope="col">{product.category.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;