import React from "react";
import "./index.css";
import Navbar from "./../../components/Navbar";
import Footer from "./../../components/Footer";
import { Card } from "./../../components/Card";
import { FaWhatsapp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Home = () => {
  return (
    <>
      <div
        className="w-full bg-fixed"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "100%",
        }}
      >
        <div
          className="bg-no-repeat bg-full bg-contain"
          style={{
            background:
              "linear-gradient(-207deg, rgba(142,96,11,0.7) 0%, rgba(0,0,0,0.85) 100%)",
          }}
        >
          <Navbar />
          <div className="container mx-auto z-10" style={{ minHeight: "27em" }}>
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              className="pt-12 p-4"
              style={{ maxWidth: "650px" }}
            >
              <h1 style={{ color: "#facc3a" }} className="text-4xl font-ubuntu">
                O seu restaurante favorito agora presente na sua tela.
              </h1>
              <p className="pt-4 text-white text-lg">
                O Barbina está localizado no centro turístico de Barra Bonita,
                servindo deliciosos pratos e porções, chopp Brotas Beer,
                cervejas e drinks!
              </p>
              <hr className="mt-4" />
              <button className="contact-button mt-8 duration-300 text-gray-800 flex gap-2 items-center py-1 px-4 ease-out rounded">
                <span>
                  <FaWhatsapp />
                </span>
                <span> Entre em contato</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="cardapio" className="container mx-auto">
        <h2 className="text-4xl font-ubuntu text-gray-800 font-semibold my-8 text-center title-underline">
          Cardápio
        </h2>
        <div data-aos="fade-right"
              data-aos-duration="1000" className="mt-2 p-5 pb-8 bg-white border rounded shadow-sm">
          <div className="flex mb-4">
            <button
              style={{ background: "rgb(237, 201, 0)" }}
              className="mx-2 text-white h-10 py-2 px-6 rounded cursor-pointer"
            >
              Procurar
            </button>
            <div className="w-40 h-10 p-1 flex border border-gray-200 rounded">
              <select className="mx-2 form-select w-full">
                <option value="US">US</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
                <option value="China">China</option>
              </select>
            </div>
            <div className="w-full mx-2">
              <div className="p-1 flex border border-gray-200 rounded">
                <input
                  placeholder="Procurar"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-4 gap-8">
            {[1,2,3,4,5,6,7,8,9,0].map(() => <Card />)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
