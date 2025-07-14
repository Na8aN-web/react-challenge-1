import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import "../assets/styles/Hamburger.css"

const Navbar = ({ footerComponent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Toggle body overflow when isOpen changes
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // For iOS Safari
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
    }, [isOpen]);

    const toggleFooter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Navbar that appears on scroll */}
            <nav className={`fixed w-full top-0 transition-all duration-300 bg-transparent z-50 bg-white ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex justify-between items-center mx-auto px-8 p-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="89" height="42" viewBox="0 0 89 42" fill="none">
                            <path d="M13.7222 41.5371C11.3052 41.5371 9.08512 41.1074 7.06201 40.248C5.0389 39.3887 3.41862 38.0907 2.20117 36.354C0.983724 34.6174 0.375 32.4062 0.375 29.7207V29.2642H8.80762V29.7207C8.80762 30.777 9.01351 31.6812 9.42529 32.4331C9.83708 33.1851 10.41 33.7669 11.144 34.1787C11.8781 34.5726 12.7375 34.7695 13.7222 34.7695C14.7606 34.7695 15.6379 34.5457 16.354 34.0981C17.0881 33.6506 17.6431 32.9971 18.019 32.1377C18.395 31.2604 18.583 30.1862 18.583 28.915V0.985352H26.9351V28.915C26.9351 31.4753 26.3979 33.7043 25.3237 35.6021C24.2495 37.4998 22.7188 38.9679 20.7314 40.0063C18.762 41.0269 16.4256 41.5371 13.7222 41.5371Z" fill="black" />
                            <path d="M59.499 21.2881V27.8945H31.999V21.2881H59.499Z" fill="black" />
                            <path d="M56.0464 7.96777V0.985352H88.9175V7.96777H76.6714V41H68.3193V7.96777H56.0464Z" fill="black" />
                        </svg>
                    </div>

                    {/* Hamburger Button */}
                    <button
                        className={`hamburger-button ${isOpen ? 'open' : ''}`}
                        onClick={toggleFooter}
                        aria-label="Toggle Menu"
                    >
                        <span className="bar top-bar"></span>
                        <span className="bar middle-bar"></span>
                        <span className="bar bottom-bar"></span>
                    </button>
                </div>
            </nav>
            
            {/* Full-screen footer overlay - not affected by scroll behavior */}
            {isOpen && (
                <div className="fixed inset-0 bg-white z-40">
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Navbar;