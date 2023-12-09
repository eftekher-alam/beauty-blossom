import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";
import AddProduct from "../components/add_product/AddProduct";
import BrandProducts from "../components/brand_products/BrandProducts";
import ErrorPage from "../components/error_page/ErrorPage";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

const env = import.meta.env;
import PrivateRoute from './PrivateRoute';
import ServiceDetails from "../components/product_details/ProductDetails";
import Cart from "../components/cart/Cart";
import Products from "../components/products/Products";
import UpdateProduct from "../components/update_product/UpdateProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/addProduct",
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>,
                loader: () => fetch(`${env.VITE_API_URL}/brands`, { method: "GET" }) //To get brand in dropdown
            },
            {
                path: "/updateProduct/:id",
                element: <PrivateRoute> <UpdateProduct></UpdateProduct> </PrivateRoute>,
                loader: ({ params }) => fetch(`${env.VITE_API_URL}/product/${params.id}`, { method: "GET" })
            },
            {
                path: "/brandProducts/:id",
                element: <BrandProducts></BrandProducts>,
                loader: ({ params }) => fetch(`${env.VITE_API_URL}/brandProducts/${params.id}`, { method: "GET" })
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
            ,
            {
                path: "/productDetails/:id",
                element: <PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`${env.VITE_API_URL}/product/${params.id}`, { method: "GET" })
            },
            {
                path: "/cart",
                element: <PrivateRoute> <Cart></Cart> </PrivateRoute>
            },
            {
                path: "/products",
                element: <Products></Products>,
                loader: () => fetch(`${env.VITE_API_URL}/products`, { method: "GET" })
            },

        ]
    }
])

export default router;