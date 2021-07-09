import React from 'react';
import Icon from "./../../assets/images/icon.png";

const Footer = () => {
    return (
        <footer className="flex items-center justify-between flex-wrap bg-yellow-500 px-5 pt-4 pb-6 mt-6">
            <div className="container flex items-center">
                <a href="/" className="mx-8 text-white">
                    <img src={Icon} className="max-h-16" alt="Icone Barbina" />
                </a>
            </div>
            <p></p>
        </footer>
    )
}

export default Footer;