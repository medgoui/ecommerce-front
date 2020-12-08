import React, { useState } from 'react';
import Layout from './Layout';
import { getOrderStatus } from './apiCore';
import ShowImage from './ShowImage';

const OrderStatus = () => {

    const [info, setInfo] = useState({
        orderId: '',
        email: '',
        error: true
    });

    const [orderList, setOrderList] = useState([]);
    const [status, setStatus] = useState('');

    const handleChange = name => event => {
        setInfo({ ...info, [name]: event.target.value });
    }

    const loadOrderStatus = (orderId, event) => {
        event.preventDefault();
        getOrderStatus(orderId).then((order, err) => {
            if (err) {
                setInfo({ ...info, error: true });
                // console.log(err);
            } else {
                // console.log(order);
                setInfo({ ...info, error: false });
                setOrderList(order[0].products);
                setStatus(order[0].status);
            }
        })
    }

    return (
        <Layout title="Order Status" description="Track your orders">
            <form>
                <div className="form-group">
                    <label htmlFor="orderID">Order ID</label>
                    <input type="text" className="form-control" id="orderID" placeholder="Order ID" onChange={handleChange('orderId')} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Email" onChange={handleChange('email')} />
                </div>
                <button className="btn btn-primary" onClick={(event) => loadOrderStatus(info.orderId, event)}>Status</button>
            </form>
            { info.error === false &&
                <div style={{ textAlign: 'center', color: status === 'Not processed' ? 'red' : 'green' }}>
                    <h4>{status}</h4>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Items</th>
                                <th scope="col">Price</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderList.map((order, i) => (
                                    <tr key={i}>
                                        <td><ShowImage item={order} url="product" /></td>
                                        <td>{order.price}$</td>
                                        <td>{order.count}</td>
                                        <td>{order.price * order.count}$</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </Layout>
    );

}

export default OrderStatus;