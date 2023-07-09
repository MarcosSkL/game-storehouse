import Carousel from "@/components/Carousel";
import CarouselDevs from "@/components/CarouselDevs";
import CarouselSmall from "@/components/CarouselSmall";
import CarouselUser from "@/components/CarouselUser";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Wellcome from "@/components/Wellcome";


export default function Home() {

  return (
    <>
      <Header />
      <Wellcome />
      <Carousel />
      <CarouselSmall />
      <CarouselUser />
      <CarouselDevs />
      <Footer />
    </>

  )
}