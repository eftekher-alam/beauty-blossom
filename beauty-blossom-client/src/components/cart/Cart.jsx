import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/auth_provider/AuthProvider";
import { MdDeleteForever } from 'react-icons/md';
import Swal from "sweetalert2";
import { CartContext } from "../../providers/cart_provider/CartProvider";


const Cart = () => {

    const { user } = useContext(AuthContext);
    const { updateCartStatus } = useContext(CartContext);
    const API_URL = import.meta.env.VITE_API_URL;

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_URL}/cartProducts/${user?.uid}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setCartProducts(data);
            })
    }, [user, API_URL])

    const handlerRemoveProduct = (_id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_URL}/cartProducts/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            const newCartProduct = cartProducts.filter(product => product._id !== _id);
                            console.log("after delete", newCartProduct);
                            setCartProducts(newCartProduct);
                            updateCartStatus();
                            Swal.fire(
                                'Removed!',
                                'Product been removed.',
                                'success'
                            )
                        }
                    })

            }
        })


    }



    // console.log("Final card status", cartProducts);
    return (
        <div
            className=" w-4/5 md:w-3/5 mx-auto my-16 font-light"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1000"
        >
            <h2 className="text-center text-5xl font-light tracking-widest my-10">MY CART</h2>
            <div className="bg-white shadow-xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-base-200">
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            cartProducts.map((product, index) =>
                                <tr key={index}>
                                    <th className="text-xs">{index + 1}</th>
                                    <td className="text-xs">{product?.ProductName}</td>
                                    <td colSpan={2} className="text-xs">$ {product?.Price}</td>
                                    <td className="text-xs"> <button onClick={() => handlerRemoveProduct(product._id)} className="tooltip" data-tip="Remove from cart"> <MdDeleteForever className="text-lg"></MdDeleteForever> </button> </td>
                                </tr>
                            )
                        }
                        <tr className="bg-base-200">
                            <th className="font-medium text-end" colSpan={2}  >Sub Total</th>
                            <td className="font-medium" colSpan={3}>$ {cartProducts.reduce((total, product) => total + parseFloat(product.Price), 0)}</td>
                        </tr>
                        <tr className="bg-base-200">
                            <th className="font-medium text-end" colSpan={2}  >Shipping Cost</th>
                            <td className="font-medium " colSpan={3}>$ 0</td>
                        </tr>
                        <tr className="bg-base-200">
                            <th className="font-medium text-end" colSpan={2}  >Grand Total</th>
                            <td className="font-medium" colSpan={3}>$ {cartProducts.reduce((total, product) => total + parseFloat(product.Price), 0)}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;