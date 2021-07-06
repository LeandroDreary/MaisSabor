import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="flex items-center justify-between flex-wrap bg-orange-600 p-4 mt-6">
            <div className="container">
                <div className="grid grid-cols-6">
                    <div className="span-col-2">
                        <a href="/" className="flex items-center flex-shrink-0 text-white mr-6">
                            <span className="text-4xl pr-3">
                                <FaPizzaSlice />
                            </span>
                            <span className="font-semibold text-xl tracking-tight">MaisSabor</span>
                        </a>
                    </div>
                    <div className="span-col-2"></div>
                    <div className="span-col-2"></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;