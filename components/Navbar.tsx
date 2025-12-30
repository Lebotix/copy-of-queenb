
import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/helpers';
import { Menu, X } from 'lucide-react';

// Custom ChessQueen component since it is missing from the current lucide-react build
const ChessQueen: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        style={style}
    >
		<path d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
		<path d="m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402"/>
		<path d="m20 9-3 9"/>
		<path d="m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34"/>
		<path d="M7 18 4 9"/>
		<circle cx="12" cy="4" r="1"/>
		<circle cx="20" cy="7" r="2"/>
		<circle cx="4" cy="7" r="2"/>
    </svg>
);

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMobileNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-purple-500/20' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center gap-2 md:gap-3 z-50 relative">
                    <div className="font-bold text-pink-400 text-3xl md:text-4xl lg:text-[2.5rem]" style={{ fontFamily: 'Ephesis, cursive' }}>
                        Queen B's Cleaning
                    </div>
                    <ChessQueen className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 mt-1" style={{ color: '#c084fc' }} />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 text-lg" style={{ fontFamily: 'Courgette, cursive' }}>
                    <button
                        onClick={() => scrollToSection('about')}
                        className="hover:text-pink-400 transition-colors border-b-2 border-transparent hover:border-pink-400 text-white"
                    >
                        About Us
                    </button>
                    <button
                        onClick={() => scrollToSection('services')}
                        className="hover:text-pink-400 transition-colors border-b-2 border-transparent hover:border-pink-400 text-white"
                    >
                        Services
                    </button>
                    <button
                        onClick={() => scrollToSection('booking')}
                        className="text-pink-400 font-bold hover:text-pink-300 transition-colors border-b-2 border-transparent hover:border-pink-300"
                    >
                        Book Now
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden z-50 relative">
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white hover:text-pink-400 transition-colors p-1"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden absolute top-0 left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-purple-500/20 transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col items-center gap-6 py-8 mt-16 text-xl" style={{ fontFamily: 'Courgette, cursive' }}>
                    <button
                        onClick={() => handleMobileNavClick('about')}
                        className="hover:text-pink-400 transition-colors text-white w-full text-center py-2"
                    >
                        About Us
                    </button>
                    <button
                        onClick={() => handleMobileNavClick('services')}
                        className="hover:text-pink-400 transition-colors text-white w-full text-center py-2"
                    >
                        Services
                    </button>
                    <button
                        onClick={() => handleMobileNavClick('booking')}
                        className="text-pink-400 font-bold hover:text-pink-300 transition-colors w-full text-center py-2"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </nav>
    );
};
