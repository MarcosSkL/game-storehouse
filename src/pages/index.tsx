import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-4 py-80">
        <span className="text-8xl rounded-full font-bold box-decoration-slice bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-3">GameStore</span>
      </div>
      <Footer />
    </>

  )
}