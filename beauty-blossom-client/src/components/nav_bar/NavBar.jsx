import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from './../../providers/auth_provider/AuthProvider';
import { useContext } from "react";
import { CartContext } from "../../providers/cart_provider/CartProvider";

const NavBar = () => {

    const API_URL = import.meta.env.VITE_API_URL;
    const { user, loggOut, loading } = useContext(AuthContext);
    const currLocation = useLocation();
    // console.log("User from navbar ", user);

    const handlerLogOut = () => {
        loggOut();
    }


    //NavBar Cart status manage
    const { cartProducts } = useContext(CartContext);
    let [cartStatus, setCartStatus] = useState([]);
    useEffect(() => {
        fetch(`${API_URL}/cartProducts/${user?.uid}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                setCartStatus(data);
            })
    }, [user, API_URL])

    if (cartProducts.length) {
        cartStatus = [...cartProducts];
    }
    // console.log("Final card status", cartStatus);



    // Theme change
    const [theme, setTheme] = useState(
        localStorage.getItem("themeStatus") ? localStorage.getItem("themeStatus") : 'cupcake'
    );
    const toggleTheme = () => {
        const changedTheme = (theme === 'cupcake') ? 'night' : 'cupcake'
        setTheme(changedTheme);
        localStorage.setItem("themeStatus", changedTheme);
    };
    // initially set the theme and "listen" for changes to apply them to the HTML tag
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        // console.log("localstorage", localStorage.getItem("themeStatus"));
    }, [theme]);


    // Fixed navbar
    const [stickyClass, setStickyClass] = useState('relative');
    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 500 ? setStickyClass('fixed top-0 left-0 z-50') : setStickyClass('relative');
        }
    }


    return (

        <div className={`navbar bg-base-100  font-light shadow-lg ${stickyClass}`}>

            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><NavLink to={"/"}>HOME</NavLink></li>
                        <li><NavLink to={"/products"}>PRODUCTS</NavLink></li>
                        <li><NavLink to={"/addProduct"}>ADD PRODUCT</NavLink></li>
                    </ul>
                </div>
                <Link to={"/"} className="normal-case text-sm md:text-3xl tracking-wide md:tracking-widest lg:ml-8 ">BEAUTY BLOSSOM</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to={"/"}>HOME</NavLink></li>
                    <li><NavLink to={"/products"}>PRODUCTS</NavLink></li>
                    <li><NavLink to={"/addProduct"}>ADD PRODUCT</NavLink></li>

                </ul>
            </div>

            <div className="navbar-end lg:mr-8">


                <div>
                    <div className="dropdown dropdown-end">
                        {
                            !loading && <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{cartStatus.length}</span>
                                </div>
                            </label>
                        }
                        <div tabIndex={0} className="mt-3 z-50 card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-light text-lg">{cartStatus.length} Items</span>
                                <span className="font-light">
                                    Subtotal:
                                    <span className="font-medium"> $ {cartStatus.reduce((total, product) => total + parseFloat(product.Price), 0)}</span>
                                </span>
                                <div className="card-actions">
                                    <Link to={"/cart"} className="btn btn-sm btn-outline btn-block font-light">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div >
                    {
                        !loading && <label className="swap swap-rotate btn btn-ghost btn-circle">

                            {/* this hidden checkbox controls the state */}
                            <input onClick={toggleTheme} type="checkbox" />

                            {/* sun icon */}
                            <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                            {/* moon icon */}
                            <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                    }
                </div>

                <div>
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {
                                            user?.photoURL ?
                                                <img src={user?.photoURL} />
                                                :
                                                <img src="https://i.ibb.co/8sQW4sR/user.png" />
                                        }
                                    </div>
                                </label>
                                <ul tabIndex={0} className="dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="p-2">
                                        <h4 className="font-medium">{user?.displayName}</h4>
                                        <h4 className="text-sm font-light">{user?.email}</h4>
                                    </li>
                                    <div className="menu menu-sm">
                                        <li><a>Settings</a></li>
                                        <li><button onClick={handlerLogOut}>Logout</button></li>
                                    </div>
                                </ul>
                            </div>
                            :
                            !loading && <div className="max-md:flex max-md:flex-col gap-2 md:space-x-2">
                                <Link state={currLocation?.state} to={"/register"} className="btn btn-sm btn-outline font-light">Register</Link>
                                <Link to={"/login"} className="btn btn-sm btn-outline font-light">Log In</Link>
                            </div>
                    }
                </div>


            </div>
        </div >
    );
};






export default NavBar;