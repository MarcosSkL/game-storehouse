import Carousel from "@/components/Carousel";
import CarouselDevs from "@/components/CarouselDevs";
import CarouselSmall from "@/components/CarouselSmall";
import CarouselUser from "@/components/CarouselUser";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Wellcome from "@/components/Wellcome";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [jogos, setJogos] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {

        axios.get('/api/jogos').then(resultado => {
            setJogos(resultado.data)

        })
    }
    const jogosList = jogos.filter(item => item.capa)

  return (
    <>
      <Header />
      <Wellcome />
      <Carousel />
      <CarouselSmall jogos={jogosList} />
      <CarouselUser />
      <CarouselDevs />
      <Footer />
    </>

  )
}