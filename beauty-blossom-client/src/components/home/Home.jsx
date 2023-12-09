import { useEffect } from "react";
import Brand from "../brand/Brand";
import MainCover from "../main_cover/MainCover";
import MarqueeSection from "../marquee_seciton/MarqueeSection";
import TopProduct from "../top_product/TopProduct";


const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <MainCover></MainCover>
            <Brand></Brand>
            <MarqueeSection></MarqueeSection>
            <TopProduct></TopProduct>
        </div>
    );
};

export default Home;