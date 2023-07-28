import React, { useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";


const Carousel = () => {
    const [jogos, setJogos] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        getAll();
    }, []);

    function getAll() {
        axios.get("/api/jogos").then((resultado) => {
            setJogos(resultado.data);
        });
    }

    const settings: Settings = {
        className: "center",
        centerPadding: "100px",
        centerMode: true,
        dots: true,
        infinite: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,

        appendDots: (dots: any) => (
            <div
                style={{
                    bottom: "10px",
                    borderRadius: "10px",
                    padding: "10px",
                }}
            >
                <ul className="&>i]:mx-[2px]" style={{ margin: "0px" }}>
                    {dots}
                </ul>
            </div>
        ),
        beforeChange: (current, next) => setCurrentSlide(next),
        customPaging: (i) => (
            <div
                className={`w-3 h-3 mx-0 rounded-full ${i === currentSlide ? "bg-slate-50" : "bg-slate-500"
                    }`}
            ></div>
        ),
    };
    return (
        <div className="p-4">
            <Slider {...settings}>
                {jogos.map((item: any) => (
                    <div key={item.id} className="p-2">
                        <Image priority src={item.background} width={1920} height={1200} alt={"Background " + item.titulo} className="rounded-lg shadow-2xl shadow-black transition duration-500 ease-in-out hover:scale-95 h-screen w-full object-fill" />
                        <div className='absolute bottom-[80px] text-white px-3 pl-[28px] sm:pl-[36px] md:pl-[48px] lg:pl-[60px] w-screen'>
                            <h2 className='font-bold text-xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl mb-3 me-60'>{item.titulo}</h2>
                            <p className='sm:text-left sm:pr-4 sm:mb-6 text-ellipsis overflow-hidden md:text-lg'>{item.desenvolvedora}</p>
                            <div className=' gap-5 items-center hidden sm:flex'>
                                <Link href={'jogos/games/' + item.id}>
                                    <button aria-label='Detalhes' className='px-[20px] bg-[#3e3b44b3] min-h-[4px] min-w-[144px] py-[12px] rounded-[200px] text-slate-50 hover:bg-gray-400 font-semibold'>Detalhes</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};
export default Carousel;