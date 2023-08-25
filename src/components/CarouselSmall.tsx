import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";


const CarouselSmall = () => {


    const [jogos, setJogos] = useState([]);


    useEffect(() => {
        getAll();
    }, []);

    function getAll() {
        axios.get("/api/jogos").then((resultado) => {
            setJogos(resultado.data);
        });
    }


    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "15px",
        slidesToShow: 6,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                },
            },
        ],

    };
    return (
        <>
            <div className="m-4">
                <h2 className="text-white text-2xl font-bold">Jogos</h2>
                <Slider {...settings}>
                    {jogos.map((item: any) => (
                        <div key={item.id} className="p-2">
                            <Link href={'jogos/games/' + item.id}>
                                <img src={item.capa}
                                    width={1920}
                                    height={1200}
                                    alt={"Background " + item.titulo}
                                    className="rounded-lg shadow-2xl shadow-black transition duration-500 ease-in-out hover:scale-110 w-full h-40 sm:h-full"
                                />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );

}
export default CarouselSmall