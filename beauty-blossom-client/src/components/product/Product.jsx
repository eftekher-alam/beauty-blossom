import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../providers/cart_provider/CartProvider';
import auth from '../../firebase/firebase.config';

const Product = ({ product, currentlocation, brandID }) => {
    const navigate = useNavigate();
    const currLocation = useLocation();
    const { saveCartProduct } = useContext(CartContext);

    const handlerSaveCartProduct = () => {
        if (!auth.currentUser)
            navigate("/login", { state: currLocation.pathname });
        saveCartProduct(product);

    }

    const { _id, ProductName, BrandName, Rating, Photo, Price } = product;

    return (
        <div
            className="card glass bg-white font-light "
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1000"
        >
            <figure><img src={Photo} alt="car!" /></figure>
            <div className="card-body justify-center items-center">
                <h2 className="card-title font-light text-xl text-center">{ProductName}</h2>
                <p className="text-sm">Brand : {BrandName}</p>
                <p className="text-sm">Rating : {Rating}</p>
                <p className="font-medium">$ {Price}</p>
                <div className="card-actions justify-end">
                    {
                        (currentlocation == `/brandProducts/${brandID}`) ?
                            <Link to={`/updateProduct/${_id}`} className="btn btn-sm btn-outline font-light">UPDATE</Link>

                            :
                            <button onClick={handlerSaveCartProduct} className="btn btn-sm btn-outline font-light">ADD TO CARD</button>
                    }

                    <Link to={`/productDetails/${_id}`} className="btn btn-sm btn-outline font-light">DETAILS</Link>
                </div>
            </div>
        </div>
    );
};

Product.propTypes = {
    product: PropTypes.object,
    currentlocation: PropTypes.string,
    brandID: PropTypes.string
}

export default Product;