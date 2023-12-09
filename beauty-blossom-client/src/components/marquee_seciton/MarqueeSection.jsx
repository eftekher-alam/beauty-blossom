import Marquee from "react-fast-marquee";
import { GiPolarStar } from "react-icons/gi";

const MarqueeSection = () => {
    return (
        <div className="bg-secondary bg-opacity-60 py-6 font-light tracking-widest uppercase">
            <Marquee>
                <span className="mx-4">free shipping</span><GiPolarStar></GiPolarStar><span className="mx-4">24/7 support</span>
                <GiPolarStar></GiPolarStar><span className="mx-4">all products is eco</span><GiPolarStar></GiPolarStar>
                <span className="mx-4">money back warranty</span><GiPolarStar></GiPolarStar><span className="mx-4">free shipping</span>
                <GiPolarStar></GiPolarStar><span className="mx-4">24/7 support</span><GiPolarStar></GiPolarStar>
                <span className="mx-4">all products is eco</span><GiPolarStar></GiPolarStar>
                <span className="mx-4">money back warranty</span><GiPolarStar></GiPolarStar>
            </Marquee>
        </div>
    );
};

export default MarqueeSection;