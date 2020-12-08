import React from 'react';
import Table from './Table';
import Layout from './Layout';

const ThankYou = ({ location, history }) => {
    return (
        <Layout
            title="Thank You for purchase"
            description="Please check your email for further instructions"
            className="container-fluid"
            style={{ textAlign: 'center' }}>
            <div className="header-receipt">
                <div>
                    <h3>THANK YOU</h3>
                    <p>Your order has been confirmed and you will receive an order confirmation shortly.</p>
                    <button type="submit" className="btn btn-primary" onClick={() => history.push('/')}>Continue Shopping</button>
                </div>
                <div>
                    <img className="header-img" src="vectorstock_32434106.jpg" />
                </div>
            </div>
            <Table products={location.state.products} />
        </Layout>
    );
}

export default ThankYou;