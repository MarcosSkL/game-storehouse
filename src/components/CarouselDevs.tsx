import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

const CarouselDevs = () => {


    const [desenvolvedoras, setDesenvolvedoras] = useState([]);


    useEffect(() => {
        getAll();
    }, []);

    function getAll() {
        axios.get("/api/desenvolvedoras").then((resultado) => {
            setDesenvolvedoras(resultado.data);
        });
    }


    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 7,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
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
                <h2 className="text-white text-2xl font-bold">Desenvolvedoras</h2>
                <Slider {...settings}>
                    {desenvolvedoras.map((item: any) => (
                        <div key={item.id} className="p-2">
                            <Link href={'desenvolvedoras/info/' + item.id}>
                                <img
                                    src={item.logo}
                                    width={1920}
                                    height={1200}
                                    alt={"Foto " + item.nome}
                                    className="rounded-lg shadow-2xl shadow-black transition duration-500 ease-in-out hover:scale-110"
                                />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );

}
export default CarouselDevs