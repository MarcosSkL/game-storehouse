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
        centerPadding: "60px",
        slidesToShow: 8,
        speed: 500

    };
    return (
        <div className="p-4">
            <h2 className="text-white text-2xl font-bold">Membros da Pagina</h2>
            <Slider {...settings}>
                {usuarios.map((item: any) => (
                    <div key={item.id} className="p-2">
                        <Link href={'usuarios/membros/' + item.id}>
                        <Image priority src={item.foto} width={1920} height={1200} alt={"Foto " + item.nome} className="rounded-lg shadow-lg" />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );

}
export default CarouselUser