import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen flex justify-center items-center flex-col gap-8">
            <div className="relative">
                <h1 className="text-7xl md:text-9xl font-light">E R R O R</h1>
                <p className="absolute text-base md:text-2xl top-12 md:top-24 left-7 md:left-24 font-light bg-white">{`404 - THE PAGE CAN'T BE FOUND.`}</p>
            </div>
            <Link to={"/"} className="btn btn-outline font-light">GO TO HOME PAGE</Link>
        </div>
    );
};

export default ErrorPage;