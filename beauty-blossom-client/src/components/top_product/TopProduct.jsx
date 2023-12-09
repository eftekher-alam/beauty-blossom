import { useEffect, useState } from "react";
import Product from "../product/Product";
import { Link } from "react-router-dom";

const TopProduct = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch(`${API_URL}/products`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [API_URL]);

    return (
        <div
            className="my-20 mx-8 lg:mx-16"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1500"
        >
            <h2 className="text-center text-5xl font-light tracking-widest my-10">TOP PRODUCTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {
                    products?.slice(0, 12).map((product, index) => <Product key={index} product={product}></Product>)
                }
            </div>
            <div className="text-center my-8">
                <Link to={"/products"}  className="btn btn-sm btn-outline font-light">Show More</Link>
            </div>
        </div>
    );
};

export default TopProduct;