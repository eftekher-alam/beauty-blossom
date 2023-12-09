import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Brand = () => {

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [brands, setBrands] = useState([]);


    // console.log("Check api url", API_URL);

    useEffect(() => {
        fetch(`${API_URL}/brands`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => setBrands(data));
    }, [API_URL]);


    return (
        <div
            className="my-20 mx-8 lg:mx-16"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1000"
        >
            <h2 className="text-center text-5xl font-light tracking-widest my-10">BRANDS</h2>
            <div className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-12">
                {
                    brands.map((brand, index) =>
                        <div
                            key={index}
                            className="card mx-auto w-32 lg:w-40 h-32 lg:h-40 bg-secondary bg-opacity-70 shadow-xl flex justify-center items-center p-5 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-easing="linear"
                            data-aos-duration="1000"
                            onClick={() => navigate(`/brandProducts/${brand._id}`)}
                        >
                            <figure className="h-4/5">
                                <img src={brand?.brandImg} alt="Shoes" className="" />
                            </figure>
                            <h2 className="text-sm">{brand?.brandName}</h2>
                        </div>
                    )
                }
            </div>
        </div >
    );
};

export default Brand;