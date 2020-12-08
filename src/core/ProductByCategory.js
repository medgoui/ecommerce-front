import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProductsByCategory, getCategory } from './apiCore';
import Card from './Card';
import { prices } from './fixedPrices';
import RadioBox from './RadioBox';


const ProductByCategory = ({ match }) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const [myFilters, setMyFilters] = useState({
        filters: { price: [] }
    });

    const loadProducts = categoryId => {
        getProductsByCategory(categoryId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        })
    }

    const loadCategory = categoryId => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategory(data);
            }
        })
    }

    const handlePrice = value => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters);
        const filteredProducts = products.filter(product => product.price >= newFilters.price[0] && product.price <= newFilters.price[1] );
        setProducts(filteredProducts);
    }

    useEffect(() => {
        const categoryId = match.params.categoryId;
        loadProducts(categoryId);
        loadCategory(categoryId);
        loadFilteredResults(myFilters.filters);
    }, [])

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === 'price') {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };


    return (
        <Layout title={category.name} description={`Try ${category.name} products`}>
            <div className="row">
                <div className="col-4">
                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>
                </div>
                <div className="col-8">
                    {
                        products.map((product, i) => (
                            <Card product={product} key={i} />
                        ))
                    }
                </div>
                {console.log(myFilters)}
            </div>
        </Layout>
    )

}

export default ProductByCategory;