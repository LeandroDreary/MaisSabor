import React from 'react';
import './index.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaMailBulk } from 'react-icons/fa';

const Contato = () => {
    return (
        <div className="contato-page">
            <Navbar />
            <div className="container mx-auto">
                <p className="text-center py-4 text-3xl font-extrabold mx-4 text-orange-700 border-b border-orange-500">Nos envie uma mensagem</p>
                <div className="grid grid-cols-2">
                    <div className="col-span-2 sm:col-span-1 bg-white shadow-lg rounded p-6 m-8 border">
                        <div className="grid grid-cols-2 mb-4">
                            <div className="col-span-1 pr-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                                    Nome:
                            </label>
                                <input className="F appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nome" type="text" placeholder="nome" />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                                    Email:
                            </label>
                                <input className="F appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="mail" placeholder="email" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assunto">
                                Assunto:
                    </label>
                            <input className="F appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="assunto" type="text" placeholder="assunto" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mensagem">
                                Mensagem:
                            </label>
                            <textarea className="F appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mensagem" placeholder="mensagem"></textarea>
                        </div>
                        <div className="flex text-center justify-between">
                            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Enviar Mensagem
                    </button>
                        </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 flex items-stretch">
                        <div className="w-4/5 sm:w-3/5 self-center h-auto mx-auto pb-6 sm:pb-0">
                            <FaMailBulk className="w-full text-orange-600 h-auto shadow-lg px-12 mb-4 border" />
                            <p className="text-xl text-orange-500 font-extrabold text-center">Seu feedBack é extremamente importante para nós!</p>
                        </div>
                    </div>
                </div>
                <p className="text-orange-700 text-3xl font-extrabold text-center p-4 border-b mx-4 border-orange-500">Ou nos faça uma visita</p>
                <div className="grid grid-cols-1 mx-4">
                    <div className="border my-4 border-orange-600">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d842.8408834217282!2d-47.222242646557476!3d-22.85887747699495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8bd74e83d18e7%3A0xa1c6a09db8facc1a!2sPizzaria%20Mais%20Sabor!5e0!3m2!1spt-BR!2sbr!4v1591760343986!5m2!1spt-BR!2sbr" width="100%" height="450" title="maps" style={{ border: 0 }} aria-hidden="false"></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Contato;
