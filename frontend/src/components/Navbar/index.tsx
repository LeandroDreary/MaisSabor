import React, { useEffect, useState } from "react";
import { AiOutlineClose as Close } from "react-icons/ai"
import "./index.css";
import Icon from "./../../assets/images/icon.png";
import Outclick from "../Outclick";
import { useAuth } from "../../hooks/Auth";
import { CgGoogle, CgLogIn, FaArrowDown, BiLogOut } from 'react-icons/all'

const Index = () => {
  const [showNavbarMenu, setShowNavbarMenu] = useState<boolean>();

  const { user, signInWithGoogle, signOut, signInWithEmailAndPassword, signUpWithEmailAndPassword } = useAuth();

  const [displayUserDropdown, setDisplayUserDropdown] = useState<boolean>(false);

  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  const [popup, setPopup] = useState<"" | "login-form" | "register-form">("");

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

  useEffect(() => {
    if (user)
      setPopup("")
  }, [user])

  return (
    <>
      {popup !== "" && (
        <div className="fixed z-50 flex items-center justify-center top-0 left-0 h-screen w-screen bg-black bg-opacity-70">
          <Outclick callback={() => setPopup("")}>
            <div data-aos="fade-down" data-aos-duration="1000" className="bg-white p-4 sm:p-8 w-full" style={{ maxWidth: "750px" }}>
              {
                {
                  "login-form": (
                    <div>
                      <h2 className="text-2xl text-barbina-brown mb-3">
                        Entrar
                      </h2>
                      <div className="flex my-5 items-center justify-center">
                        <span className="absolute text-gray-500 bg-white text-sm px-2">Redes sociais</span>
                        <hr className="w-full" />
                      </div>
                      <div className="w-full py-2 flex justify-center">
                        <button onClick={signInWithGoogle} type="button" className="flex items-center gap-2 bg-red-500 hover:bg-red-700 px-4 py-2 text-white">
                          <CgGoogle />
                          Entrar com o google
                        </button>
                      </div>
                      <div className="flex my-5 items-center justify-center">
                        <span className="absolute text-gray-500 bg-white text-sm px-2">ou</span>
                        <hr className="w-full" />
                      </div>
                      <form onClick={e => { e.preventDefault(); signInWithEmailAndPassword(email, password) }}>
                        <div className="w-full my-2">
                          <label className="text-gray-600" htmlFor="name">
                            Email:
                          </label>
                          <div className="bg-white flex border border-gray-200 rounded">
                            <input
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              name="email"
                              placeholder="Email"
                              type="email"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                            />
                          </div>
                        </div>
                        <div className="w-full my-2">
                          <label className="text-gray-600" htmlFor="name">
                            Senha:
                          </label>
                          <div className="bg-white flex border border-gray-200 rounded">
                            <input
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              name="password"
                              placeholder="Senha"
                              type="password"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                            />
                          </div>
                        </div>
                        <div className="w-full flex justify-between my-4">
                          <button type="submit" className="duration-300 flex items-center text-lg gap-2 bg-yellow-500 hover:bg-yellow-700 px-4 py-1 text-white">
                            <CgLogIn />
                            Entrar
                          </button>
                          <button onClick={() => setPopup("register-form")} className="duration-300 text-white bg-yellow-400 py-1 px-4 ease-out rounded hover:bg-yellow-500">
                            Registrar-se
                          </button>
                        </div>
                      </form>
                    </div>
                  ),
                  "register-form": <div>
                    <h2 className="text-2xl text-barbina-brown mb-3">
                      Registrar-se
                    </h2>
                    <hr />
                    <form onClick={e => { e.preventDefault(); signUpWithEmailAndPassword(name, email, password) }}>
                      <div className="w-full my-2">
                        <label className="text-gray-600" htmlFor="name">
                          name:
                        </label>
                        <div className="bg-white flex border border-gray-200 rounded">
                          <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            name="name"
                            placeholder="Nome"
                            type="text"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                          />
                        </div>
                      </div>
                      <div className="w-full my-2">
                        <label className="text-gray-600" htmlFor="name">
                          Email:
                        </label>
                        <div className="bg-white flex border border-gray-200 rounded">
                          <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            name="email"
                            placeholder="Email"
                            type="email"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                          />
                        </div>
                      </div>
                      <div className="w-full my-2">
                        <label className="text-gray-600" htmlFor="name">
                          Senha:
                        </label>
                        <div className="bg-white flex border border-gray-200 rounded">
                          <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            name="password"
                            placeholder="Senha"
                            type="password"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                          />
                        </div>
                      </div>
                      <div className="w-full flex justify-between my-4">
                        <button type="submit" className="flex duration-300 items-center text-lg gap-2 bg-yellow-500 hover:bg-yellow-700 px-4 py-1 text-white">
                          <CgLogIn />
                          Registrar
                        </button>
                        <button onClick={() => setPopup("login-form")} className="duration-300 text-white bg-yellow-400 py-1 px-4 ease-out rounded hover:bg-yellow-500">
                          Entrar
                        </button>
                      </div>
                    </form>
                  </div>,
                }[popup]
              }
            </div>
          </Outclick>
        </div>
      )}
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
            <svg onClick={() => setShowNavbarMenu(!showNavbarMenu)} style={{ color: "#ffedb4", borderColor: "#ffedb4", backgroundColor: "#4a321fee" }}
              className={`${showNavbarMenu ? "opacity-0 " : ""}duration-500 fill-current m-4 z-30 fixed border lg:relative top-0 right-0 p-1 px-2 rounded`}
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
            <Close onClick={() => setShowNavbarMenu(!showNavbarMenu)} style={{ color: "#ffedb4" }} className={`${!showNavbarMenu ? "opacity-0 " : ""}duration-500 pt-2 pr-2 fill-current my-3 mr-3 z-30 fixed lg:relative top-0 right-0`} />
          </label>

          <div className={`${!showNavbarMenu ? "hidde " : ""}fixed lg:relative right-0 top-0 menu-items w-full lg:w-auto text-right h-screen lg:h-auto lg:order-3 flex lg:flex-wrap justify-end lg:mr-4`}>

            <div className={`w-full items-menu-display lg:block text-lg flex-grow lg:flex lg:w-auto`}>
              <div data-aos={`${!showNavbarMenu ? "fade-down" : ""}`} data-aos-duration="1000" className={`${!showNavbarMenu ? `${!showNavbar ? "opacity-0 " : ""}duration-500 ` : ""}pt-2 lg:pt-0 mt-8`}>
                <a href="/#cardapio" className="block lg:inline-block lg:mt-0 menuOptions my-6 lg:my-0 mx-6 lg:ml-0">
                  Cardápio
                </a>
                <a
                  href="/contato" className="block lg:inline-block lg:mt-0 menuOptions my-6 lg:my-0 mx-6 lg:ml-0">
                  Contato
                </a>
                <a href="/sobre" className="block lg:inline-block lg:mt-0 menuOptions my-6 lg:my-0 mx-6 lg:ml-0">
                  Sobre
                </a>
                {
                  user ? (<>
                    <span className="text-right block lg:inline-block lg:mt-0 text-light-yellow my-4 lg:my-0 mr-6">
                      <span className="flex gap-3 h-0 justify-end my-10 lg:my-0 items-center">
                        <span className="relative">
                          <span onClick={() => setDisplayUserDropdown(true)} className="flex items-center gap-1 menuOptions">
                            {user.name}
                            <FaArrowDown />
                          </span>
                          {
                            displayUserDropdown && (
                              <Outclick callback={() => setDisplayUserDropdown(false)}>
                                <div data-aos="zoom-in" data-aos-duration="500" className="rounded-sm shadow-lg mt-2 text-barbina-brown bg-white py-1 text-sm absolute right-0">
                                  <span onClick={() => { signOut(); setDisplayUserDropdown(false); }} className="cursor-pointer hover:bg-gray-100 px-3 flex items-center gap-1">Logout<BiLogOut /></span>
                                </div>
                              </Outclick>
                            )
                          }

                        </span>
                        <img className="h-10 rounded-full w-10" src={user.avatar} alt={user.name} />
                      </span>
                    </span>

                  </>) : (<>
                    <button onClick={() => setPopup("login-form")} className="duration-300 lg:inline-block bg-transparent text-yellow-300 py-1 px-4 ease-out rounded border border-yellow-300 mr-4 hover:bg-yellow-300 hover:text-barbina-brown">
                      Entrar
                    </button>
                    <button onClick={() => setPopup("register-form")} className="duration-300 mr-6 lg:mr-0 text-white lg:inline-block bg-yellow-400 py-1 px-4 ease-out rounded hover:bg-yellow-500">
                      Registrar-se
                    </button>
                  </>)
                }

              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Index;
