import { Link } from "react-router-dom";

const MainCover = () => {
    return (
        <div
            className="hero min-h-[85vh]"
            style={{ backgroundImage: 'url(https://i.ibb.co/ZhGcsFr/main-cover.jpg)' }}
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="150"
            data-aos-offset="0">
            {/* <div className="hero-overlay bg-secondary bg-opacity-30"></div> */}
            <div className="hero-content text-center text-neutral-content">
                <div
                    className="max-w-md"
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="400"
                    data-aos-offset="0"
                >
                    <h3 className="mb-5 text-3xl tracking-widest text-neutral font-thin">TOUCH</h3>
                    <h1 className="mb-5 text-6xl tracking-widest text-neutral font-light">PREMIUM</h1>
                    <p className="mb-5 text-neutral tracking-widest font-light">Discover the Magic of Cosmetics <br /> Where Beauty Meets Confidence, Naturally</p>
                    <Link to={"/products"} className="btn btn-outline tracking-widest font-light">Shop Now</Link>
                </div>
            </div>
        </div>
    );
};

export default MainCover;