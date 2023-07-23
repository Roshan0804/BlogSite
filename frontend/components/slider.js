import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function Slider({ opacity, children }){
    return (
        <Carousel showArrows={true} showStatus={false} showThumbs={false} autoPlay={true} className="bg-gray-100 border-b">
            { children }
        </Carousel>
    );
}