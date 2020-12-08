import React, { useState, useEffect } from 'react';
import { getCategories } from './apiCore';
import { Link } from 'react-router-dom';
import shopPic from '../../src/shop.png';

const Footer = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        })
    }, []);
    return (
        <footer className="footer-style">
            <div className="row">
                <div className="col-12 col-md">
                    <img src={shopPic} alt="Happy shop" width="300" height="250" />
                </div>
                <div className="col-6 col-md">
                    <h5>Shop</h5>
                    <h6>By Category</h6>
                    <ul className="list-unstyled text-small">
                        {
                            categories.map((category, i) => (
                                <li key={i}><Link to={`/category/product/${category._id}`} style={{ textDecoration: 'none' }}>{category.name}</Link></li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Follow our shop</h5>
                    <div className="follow-style">
                        <i className="fab fa-facebook-square logo-style fa-lg"></i>
                        <i className="fab fa-twitter-square logo-style fa-lg"></i>
                        <i className="fab fa-instagram logo-style fa-lg"></i>
                        <i className="fab fa-youtube-square logo-style fa-lg"></i>
                    </div>
                </div>
                <div className="col-6 col-md">
                    <h5>Contact</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link to="/contact" style={{ textDecoration: 'none' }}>Contact us</Link></li>
                        <li><Link to="/order/status" style={{ textDecoration: 'none' }}>Order status</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;