import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import UserDashbord from './user/UserDashbord';
import AdminRoute from './auth/AdminRoute';
import AdminDashbord from './user/AdminDashbord';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import ThankYou from './core/ThankYou';
import OrderStatus from './core/OrderStatus';
import ProductByCategory from './core/ProductByCategory';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashbord" exact component={UserDashbord} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path="/admin/dashbord" exact component={AdminDashbord} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/thankyou" render={(props) => <ThankYou {...props} />} />
                <Route path="/order/status" exact component={OrderStatus} />
                <Route path="/category/product/:categoryId" exact component={ProductByCategory} />

            </Switch>
        </BrowserRouter>
    );
}

export default Router;