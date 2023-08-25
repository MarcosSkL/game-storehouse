import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

const CarouselUser = () => {


    const [usuarios, setUsuarios] = useState([]);


    useEffect(() => {
        getAll();
    }, []);

    function getAll() {
        axios.get("/api/usuarios").then((resultado) => {
            setUsuarios(resultado.data);
        });
    }


    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 7,
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
                <h2 className="text-white text-2xl font-bold">Membros da Pagina</h2>
                <Slider {...settings}>
                    {usuarios.map((item: any) => (
                        <div key={item.id} className="p-2">
                            <Link href={'usuarios/membros/' + item.id}>
                                <img
                                    src={item.foto}
                                    width={1920}
                                    height={1200}
                                    alt={"Foto " + item.nome}
                                    className="rounded-lg shadow-2xl shadow-black transition duration-500 ease-in-out hover:scale-110 w-full h-40 sm:h-56 object-fill"
                                />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );

}
export default CarouselUser