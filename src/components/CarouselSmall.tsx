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
        centerPadding: "60px",
        slidesToShow: 8,
        speed: 500

    };
    return (
        <div className="p-4">
            <h2 className="text-white text-2xl font-bold">Jogos em Alta</h2>
            <Slider {...settings}>
                {jogos.map((item: any) => (
                    <div key={item.id} className="p-2">
                        <Link href={'jogos/games/' + item.id}>
                        <Image priority src={item.capa} width={1920} height={1200} alt={"Background " + item.titulo} className="rounded-lg shadow-lg" />
                        </Link>





                    </div>
                ))}
            </Slider>
        </div>
    );

}
export default CarouselSmall