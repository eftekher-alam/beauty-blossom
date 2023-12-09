import { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Link, useLoaderData, useLocation, useParams } from 'react-router-dom';
import Product from '../product/Product';

const BrandProducts = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    const products = useLoaderData();
    const { id } = useParams();
    const [brand, setBrand] = useState({});
    const currentlocation = useLocation().pathname;


    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_URL}/brand/${id}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => setBrand(data));
    }, []);

    if (products.length > 0)
        return (
            <div className='min-h-screen'>
                <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="200"
                    data-aos-offset="0"
                >
                    <AutoplaySlider
                        play={true}
                        cancelOnInteraction={false} // should stop playing on user interaction
                        interval={6000}
                        className="h-[75vh]"

                    >
                        {
                            products?.slice(0, 3).map((product, index) =>
                                <div key={index} className="hero min-h-screen bg-base-200">
                                    <div className="hero-content flex-col md:flex-row gap-12 md:gap-16 lg:gap-28">
                                        <div className='md:w-1/2 flex justify-end'>
                                            <img src={product.Photo} className="max-w-sm rounded-lg shadow-2xl" />
                                        </div>
                                        <div className='md:w-1/2 flex justify-start'>
                                            <div className='max-md:text-center'>
                                                <h1 className="text-2xl md:text-5xl font-bold font-light">{product.ProductName}</h1>
                                                <p className="py-4 font-light">{product.ShortDescription} </p>
                                                <p className="pb-6 font-medium">$ {product.Price}</p>
                                                <div className='space-x-4'>
                                                    <Link to={`/updateProduct/${product._id}`} className="btn btn-sm btn-outline font-light">UPDATE</Link>
                                                    <Link to={`/productDetails/${product._id}`} className="btn btn-sm btn-outline font-light">DETAILS</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </AutoplaySlider>
                </div>

                <div className='text-center mt-16 mb-8'>
                    <h2 className='font-light text-xl'>Showing products of <span className='font-bold'>{brand.brandName}</span> brand</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-8 md:mx-16 my-8">
                    {
                        products.map((product, index) =>
                            <Product
                                key={index}
                                product={product}
                                currentlocation={currentlocation}
                                brandID={id}
                            ></Product>)
                    }
                </div>
            </div>
        );
    return (
        <div className="h-screen flex justify-center items-center flex-col gap-8">
            <div className="relative">
                <h1 className="text-4xl md:text-8xl font-light tracking-widest">NOT  FOUND</h1>
                <p className="absolute text-base md:text-2xl top-8 md:top-16 left-2 md:left-20 font-light bg-white">{`DATA IS NOT AVAILABLE FOR`} </p>
                <p className="absolute text-base md:text-2xl top-12 md:top-24 left-8 md:left-64 font-light bg-white">{` THE BRAND`} <span className='font-bold'>{brand.brandName}</span> </p>
            </div>
        </div>
    );
};

export default BrandProducts;