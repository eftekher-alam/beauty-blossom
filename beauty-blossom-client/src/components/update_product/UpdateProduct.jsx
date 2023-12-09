import { useEffect } from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const product = useLoaderData();
    const { ProductName, BrandID, ShortDescription, Rating, Photo, Price } = product;
    const [brands, setBrands] = useState([]);
    const [brandNameError, setBrandNameError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_URL}/brands`, { method: "GET" })
            .then(res => res.json())
            .then(data => setBrands(data))
    }, [API_URL])

    const handlerUpdateProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const ProductName = form.ProductName.value;
        const BrandID = form.BrandName.value;
        let BrandName = "";
        let BrandPhoto = "";
        const Price = form.Price.value;
        const ShortDescription = form.ShortDescription.value;
        const Rating = form.Rating.value;
        const Photo = form.Photo.value;

        if (BrandID === "Pick a brand name") {
            setBrandNameError("Required");
            return;
        }
        else {
            const brand = brands.find(brand => brand._id === BrandID);
            BrandName = brand.brandName;
            BrandPhoto = brand.brandImg;
            setBrandNameError(null);
        }

        const newProduct = { ProductName, BrandID, BrandName, BrandPhoto, ShortDescription, Rating, Photo, Price };


        fetch(`${API_URL}/product/${product._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    form.reset();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Product has been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
    }

    return (
        <div>


            <div
                className="card w-4/5 md:w-3/5 mx-auto bg-white bg-opacity-60 shadow-xl my-10"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
            >
                <div className="card-body">
                    <h2 className="card-title mx-auto font-light tracking-widest text-3xl">UPDATE PRODUCT</h2>
                    <hr />
                    <form onSubmit={handlerUpdateProduct}>

                        {/* form-row */}
                        <div className="flex gap-4 md:gap-8 pb-4 max-md:flex-col">
                            <div className="form-control w-full  ">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" name="ProductName" defaultValue={ProductName} placeholder="Product name here..." className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control w-full  ">
                                <label className="label">
                                    <span className="label-text">
                                        Brand Name
                                        <span className=" ml-4 text-error">{brandNameError}</span>
                                    </span>
                                </label>
                                <select className="select select-bordered" name="BrandName">
                                    {
                                        brands.map((brand, index) => <option key={index} value={brand?._id} selected={brand?._id == BrandID}>{brand?.brandName}</option>)
                                    }

                                </select>
                            </div>
                        </div>

                        {/* form-row */}
                        <div className="flex gap-8 pb-4">
                            <div className="form-control w-full  ">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" name="Price" defaultValue={Price} placeholder="Price here..." className="input input-bordered w-full  " required />
                            </div>
                            <div className="form-control w-full  ">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <input type="number" name="Rating" defaultValue={Rating} placeholder="Rating here..." className="input input-bordered w-full  " />
                            </div>

                        </div>

                        {/* form-row */}
                        <div className="flex gap-8 pb-4">
                            <div className="form-control w-full  ">
                                <label className="label">
                                    <span className="label-text">Short Description</span>
                                </label>
                                <input type="text" name="ShortDescription" defaultValue={ShortDescription} placeholder="Short description here..." className="input input-bordered w-full  " />
                            </div>
                        </div>

                        {/* form-row */}
                        <div className="flex gap-8 w-full pb-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="Photo" defaultValue={Photo} placeholder="www.photo.com/coffee-photo" className="input input-bordered w-full" required />
                            </div>
                        </div>

                        {/* form-row */}
                        <div className="flex gap-8 w-full">
                            <div className="form-control mx-auto">
                                <button type="submit" className="btn btn-outline font-light">Submit</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;