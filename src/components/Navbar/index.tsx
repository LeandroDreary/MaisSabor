import React, { useEffect, useState } from "react";
import {AiOutlineClose as Close} from "react-icons/ai"
import "./index.css";
import Icon from "./../../assets/images/icon.png";

const Index = () => {
  const [showNavbarMenu, setShowNavbarMenu] = useState<boolean>();
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  const [y, setY] = useState(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", (e: any) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setShowNavbar(true);
      } else if (y < window.scrollY) {
        setShowNavbar(false);
      }
      setY(window.scrollY);
    });

  }, [y]);
  
  return (
    <>
      <nav className={`w-full`}>
        <div className="w-full flex justify-between px-6 py-2">
          <div data-aos="fade-down" data-aos-duration="1000" className={`${!showNavbar ? "opacity-0 " : ""}duration-500 flex items-center md:w-auto w-full order-3`}>
            <div>
              <ul className="md:flex items-center justify-between md:pt-0">
                <li>
                  <a
                    className="inline-block no-underline hover:text-black font-medium text-lg"
                    href="/"
                  >
                    <span className="text-4xl sm:h-24 pr-3">
                      <img src={Icon} className="max-h-24 z-40" alt="Icone Barbina" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <label
            htmlFor="menu-toggle"
            className="cursor-pointer text-5xl lg:hidden block order-3"
          >
            <svg onClick={() => setShowNavbarMenu(!showNavbarMenu)} style={{color: "#ffedb4"}}
              className={`${showNavbarMenu? "opacity-0 " : ""}duration-500 fill-current m-4 z-30 fixed lg:relative top-0 right-0`}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
            <Close onClick={() => setShowNavbarMenu(!showNavbarMenu)} style={{color: "#ffedb4"}} className={`${!showNavbarMenu? "opacity-0 " : ""}duration-500 fill-current my-3 mr-3 z-30 fixed lg:relative top-0 right-0`} />
          </label>

          <div className={`${
                !showNavbarMenu ? "hidde " : ""
              }  fixed lg:relative right-0 top-0 menu-items w-full lg:w-auto text-right h-screen lg:h-auto lg:order-3 flex lg:flex-wrap justify-end lg:mr-4`}>
            <div
              className={`w-full items-menu-display lg:block flex-grow lg:flex lg:w-auto`}
            >
              <div data-aos={`${!showNavbarMenu ? "fade-down" : ""}`} data-aos-duration="1000" className={`${!showNavbarMenu ?`${!showNavbar ? "opacity-0 " : ""}duration-500 ` : ""}pt-2 lg:pt-0 text-lg mt-12`}>
                <a
                  href="#cardapio"
                  className="block lg:inline-block lg:mt-0 menuOptions my-6 lg:my-0 mr-6"
                >
                  Cardápio
                </a>
                <a
                  href="/contato"
                  className="block lg:inline-block lg:mt-0 menuOptions my-6 lg:my-0 mr-6"
                >
                  Contato
                </a>
                <a
                  href="/sobre"
                  className="block lg:inline-block lg:mt-0 menuOptions my-6 lg:my-0 mr-6"
                >
                  Sobre
                </a>
                <button className="duration-300 lg:inline-block bg-transparent text-yellow-300 py-1 px-4 ease-out rounded border border-yellow-300 mr-4 hover:bg-white hover:text-yellow-400">
                  Entrar
                </button>
                <button className="duration-300 mr-6 lg:mr-0 text-white lg:inline-block bg-yellow-400 py-1 px-4 ease-out rounded hover:bg-yellow-500">
                  Registrar-se
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Index;
