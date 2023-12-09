import { createContext, useState } from "react";
import PropTypes from "prop-types";
import auth from './../../firebase/firebase.config';
import Swal from "sweetalert2";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {

    const API_URL = import.meta.env.VITE_API_URL;
    const [cartProducts, setCartProducts] = useState([]);

    const saveCartProduct = (product) => {
        const { _id, ProductName, Price } = product;
        const UserId = auth.currentUser.uid;
        // console.log("User id", UserId);
        const ProductId = _id;
        const cartProduct = { UserId, ProductId, ProductName, Price }

        fetch(`${API_URL}/cartProduct`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(cartProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    updateCartStatus();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Product has been added to cart',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            });
    }


    const updateCartStatus = () => {
        fetch(`${API_URL}/cartProducts/${auth.currentUser?.uid}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setCartProducts(data);
            })
    }


    const cartInfo = { saveCartProduct, cartProducts, updateCartStatus };

    return (
        <CartContext.Provider value={cartInfo}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node
}

export default CartProvider;