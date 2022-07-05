import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import Outclick from "../../Utils/Outclick";

import { useAuth } from "../../../hooks/Auth";

import Icon from "./../../../assets/images/icon.png";
import { CgGoogle, CgLogIn, BiLogOut, FaAngleDown, VscListFlat, AiOutlineClose as Close, VscLoading } from 'react-icons/all'
import Warning, { WarningType } from "../../Utils/Warning";

const Index = () => {
  const [showNavbarMenu, setShowNavbarMenu] = useState<boolean>();

  const [popup, setPopup] = useState<"" | "login-form" | "register-form">("");

  useEffect(() => {
    let body = document.querySelectorAll("body")[0]
    if (popup !== "" && popup !== undefined) {
      if (body)
        body.style.overflow = "hidden"
    } else {
      body.style.overflow = "auto"
    }
  }, [popup])

  const { userInfo, signInWithGoogle, signOut, signIn, signUp } = useAuth()

  // form inputs
  const [loginForm, setLoginForm] = useState<{ usernameOrEmail: string, password: string }>({ usernameOrEmail: "", password: "" });
  const [registerForm, setRegisterForm] = useState<{ username: string, email: string, password: string }>({ username: "", email: "", password: "" });

  // form state
  const [reqAble, setReqAble] = useState<{ login: boolean, register: boolean }>({ login: true, register: true })

  const [warnings, setWarnings] = useState<WarningType[]>()

  const [displayUserDropdown, setDisplayUserDropdown] = useState<boolean>(false);

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
                      <form onSubmit={e => {
                        e.preventDefault();
                        if (!reqAble.login) return;
                        setReqAble({ ...reqAble, login: false })
                        signIn(loginForm.usernameOrEmail, loginForm.password)
                          .then(() => {
                            setPopup("")
                          }).catch(err => {
                            if (err.response.data.message)
                              setWarnings([{ type: "error", message: err.response.data.message, input: "loginForm" }])
                            else
                              setWarnings([{ type: "error", message: "Ocorreu um erro!", input: "loginForm" }])
                          }).finally(() => {
                            setReqAble({ ...reqAble, login: true })
                          })
                      }}>
                        <Warning datas={{ input: "loginForm", warnings }} />

                        <div className="w-full my-2">
                          <label className="text-gray-600" htmlFor="usernameOrEmail">
                            Email ou nome de usuário:
                          </label>
                          <div className="bg-white flex border border-gray-200 rounded">
                            <input
                              defaultValue=""
                              onChange={e => setLoginForm({ ...loginForm, usernameOrEmail: e.target.value })}
                              name="usernameOrEmail"
                              placeholder="Digite seu email ou nome de usuário"
                              type="text"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                            />
                          </div>
                        </div>
                        <div className="w-full my-2">
                          <label className="text-gray-600" htmlFor="password">
                            Senha:
                          </label>
                          <div className="bg-white flex border border-gray-200 rounded">
                            <input
                              defaultValue=""
                              onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                              name="password"
                              placeholder="Digite sua senha"
                              type="password"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                            />
                          </div>
                        </div>
                        <div className="w-full flex justify-between my-4">
                          <button type="submit" className="duration-300 flex items-center text-lg gap-2 bg-yellow-500 hover:bg-yellow-700 px-4 py-1 text-white">
                            {reqAble.login ?
                              <>
                                <CgLogIn />
                                Entrar
                              </>
                              :
                              <VscLoading className="animate-spin" />
                            }
                          </button>
                          <button type="button" onClick={() => setPopup("register-form")} className="duration-300 text-white bg-yellow-400 py-1 px-4 ease-out rounded hover:bg-yellow-500">
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
                    <form onSubmit={e => {
                      e.preventDefault();
                      if (!reqAble.register) return;
                      setReqAble({ ...reqAble, register: false })
                      signUp(registerForm.username, registerForm.email, registerForm.password)
                        .then(() => {
                          setPopup("")
                        }).catch(err => {
                          if (err.response.data.message)
                            setWarnings([{ type: "error", message: err.response.data.message, input: "registerForm" }])
                          else
                            setWarnings([{ type: "error", message: "Ocorreu um erro!", input: "registerForm" }])
                        }).finally(() => {
                          setReqAble({ ...reqAble, register: true })
                        })
                    }}>
                      <Warning datas={{ input: "registerForm", warnings }} />
                      <div className="w-full my-2">
                        <label className="text-gray-600" htmlFor="username">
                          Nome de usuário:
                        </label>
                        <div className="bg-white flex border border-gray-200 rounded">
                          <input
                            defaultValue=""
                            onChange={e => setRegisterForm({ ...registerForm, username: e.target.value })}
                            name="username"
                            placeholder="Digite seu nome de usuário"
                            type="text"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                          />
                        </div>
                      </div>
                      <div className="w-full my-2">
                        <label className="text-gray-600" htmlFor="email">
                          Email:
                        </label>
                        <div className="bg-white flex border border-gray-200 rounded">
                          <input
                            defaultValue=""
                            onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                            name="email"
                            placeholder="Dogite seu email"
                            type="email"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                          />
                        </div>
                      </div>
                      <div className="w-full my-2">
                        <label className="text-gray-600" htmlFor="password">
                          Senha:
                        </label>
                        <div className="bg-white flex border border-gray-200 rounded">
                          <input
                            defaultValue=""
                            onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                            name="password"
                            placeholder="digite sua senha"
                            type="password"
                            className="p-1 px-2 appearance-none outline-none w-full text-gray-600"
                          />
                        </div>
                      </div>
                      <div className="w-full flex justify-between my-4">
                        <button type="submit" className="flex duration-300 items-center text-lg gap-2 bg-yellow-500 hover:bg-yellow-700 px-4 py-1 text-white">
                          {reqAble.register ?
                            <>
                              <CgLogIn />
                              Register
                            </>
                            :
                            <VscLoading className="animate-spin" />
                          }
                        </button>
                        <button type="button" onClick={() => setPopup("login-form")} className="duration-300 text-white bg-yellow-400 py-1 px-4 ease-out rounded hover:bg-yellow-500">
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

      <span onClick={() => setShowNavbarMenu(!showNavbarMenu)} className={`fixed z-50 text-yellow-100 border-2 rounded m-4 border-yellow-100 cursor-pointer text-4xl lg:hidden flex-none top-0 right-0`}>
        {showNavbarMenu ?
          <Close />
          : <VscListFlat />
        }
      </span>
      <div className="container mx-auto">
        <nav className={`flex justify-between lg:h-auto`}>
          <Link data-aos="fade-down" to="/">
            <img src={Icon} className={`${showNavbarMenu && "opacity-0"} lg:opacity-100 max-h-24 z-40 pt-2`} alt="Icone Barbina" />
          </Link>

          <div className={`${showNavbarMenu && "fixed lg:relative w-screen bg-black/50 lg:bg-transparent h-screen top-0 left-0 lg:h-auto"} flex z-40 justify-between`}>
            {showNavbarMenu && <Link className="lg:hidden" to="/">
              <img src={Icon} className="max-h-24 z-40 pt-2" alt="Icone Barbina" />
            </Link>}
            <div className={`${!showNavbarMenu ? "hidden" : "flex"} relative bg-yellow-900 lg:bg-transparent text-white text-lg lg:justify-end lg:grow lg:flex flex-col lg:flex-row items-start pt-6 px-6 gap-5 right-0 top-0 w-64 lg:w-auto h-screen lg:h-auto`}>
              {[
                { name: "Cardápio", link: "/#cardapio" },
                { name: "Contato", link: "/contato" },
                { name: "Sobre", link: "/sobre" }
              ].map((elem, index) => {
                return (
                  <Link key={`${elem.link}-${elem.name}-${index}`} to={elem.link} className="menuOptions text-amber-100">
                    {elem.name}
                  </Link>
                )
              })}

              {
                userInfo ? (
                  <>
                    <Outclick callback={() => setDisplayUserDropdown(false)}>
                      <div className="relative">
                        <span onClick={() => setDisplayUserDropdown(!displayUserDropdown)} className="flex items-center text-amber-100 menuOptions gap-1">
                          {userInfo.username}
                          <FaAngleDown />
                        </span>
                        {
                          displayUserDropdown && (
                            <div data-aos="zoom-in" data-aos-duration="500" className="rounded-sm shadow-lg bg-white mt-2 text-gray-700 w-36 text-sm absolute right-0">
                              <span onClick={signOut} className="cursor-pointer hover:bg-gray-100 py-1 px-3 flex items-center gap-1">Logout<BiLogOut /></span>
                              {userInfo.admin && <Link to={"/admin"} className="cursor-pointer hover:bg-gray-100 py-1 px-3 flex items-center gap-1">Administrative área</Link>}
                            </div>
                          )
                        }
                      </div>
                    </Outclick>
                    {userInfo.profilePicture &&
                      <img className="h-10 rounded-full w-10" src={userInfo.profilePicture} alt={userInfo.username} />
                    }
                  </>
                ) : (
                  <div className="flex gap-1">
                    <button onClick={() => setPopup("login-form")} className="duration-300 bg-transparent py-1 px-3 ease-out rounded border text-yellow-300 border-yellow-300 hover:bg-yellow-300 hover:text-amber-900">
                      Entrar
                    </button>
                    <button onClick={() => setPopup("register-form")} className="duration-300 text-white bg-yellow-400 py-1 px-4 ease-out rounded hover:bg-yellow-500">
                      Registrar-se
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Index;
