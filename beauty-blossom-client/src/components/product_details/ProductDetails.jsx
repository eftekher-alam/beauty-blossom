import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { CartContext } from "../../providers/cart_provider/CartProvider";


const ProductDetails = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const product = useLoaderData();
    const { saveCartProduct } = useContext(CartContext);

    const { ProductName, BrandName, ShortDescription, Rating, Photo, Price } = product;

    return (
        <div className="my-6 max-w-4xl mx-auto">
            <div className="max-lg:mx-8  space-y-8 my-16">
                <h1 className="text-3xl text-center font-light tracking-widest">{ProductName}</h1>
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-6 space-y-4">
                        <img src={Photo} className="w-1/2 mx-auto" alt="" />
                    </div>
                    <div className="font-light space-y-2 md:col-span-6">
                        <p className="text-xl font-medium tracking-widest" >Detail info</p>
                        <hr />
                        <p className="text-justify">{ShortDescription}</p>
                        <hr />
                        <p>Brand Name : {BrandName} </p>
                        <hr />
                        <p>Rating : <span>{Rating}</span></p>
                        <hr />
                        <p>Price : <span className="font-medium">$ {Price}</span></p>
                        <hr />
                        <button onClick={() => saveCartProduct(product)} className="btn btn-sm btn-outline font-light">ADD TO CARD</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;