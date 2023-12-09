import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Product from "../product/Product";

const Products = () => {
    const products = useLoaderData();
    // console.log(products);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-7 md:my-14 mx-8">
            {
                products.map((product, index) => <Product key={index} product={product}></Product>)
            }
        </div>
    );
};

export default Products;