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
        slidesToShow: 8,
        speed: 500

    };
    return (
        <div className="p-4">
            <h2 className="text-white text-2xl font-bold">Desenvolvedoras</h2>
            <Slider {...settings}>
                {desenvolvedoras.map((item: any) => (
                    <div key={item.id} className="p-2">
                        <Link href={'desenvolvedoras/info/' + item.id}>
                        <Image priority src={item.logo} width={9999} height={9999} alt={"Foto " + item.nome} className="rounded-lg shadow-2xl shadow-black transition duration-500 ease-in-out hover:scale-110" />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );

}
export default CarouselDevs