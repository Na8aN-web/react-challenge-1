import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../../../assets/contact.png'

const ContactComponent = () => {
    return (
        <motion.section
            className="min-h-screen"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <div
                className="min-h-screen bg-cover bg-center relative bg-no-repeat bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Background texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-center items-end min-h-screen pr-16">
                    {/* Header text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-right mb-8 max-w-xl"
                    >
                        <h2 className="text-white text-[32px] font-inter absolute top-4 right-8 font-bold leading-relaxed">
                            <h1 className='text-center '>Global presence,</h1>
                            global recognition — Contact me to take <br />your next step.
                        </h2>
                    </motion.div>
                </div>

                {/* Main content */}
                <div className="absolute bottom-12 left-16 z-10">
                    {/* Contact me button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <motion.button
                            className="text-white text-7xl md:text-[100px] font-bold overflow-hidden group"
                            whileHover="hover"
                            initial="initial"
                        >
                            <span className="relative z-10"> Contact me</span>

                            {/* Animated underline */}
                            <motion.div
                                className="absolute bottom-0 left-0 w-full h-2 bg-white origin-left"
                                variants={{
                                    initial: { scaleX: 0 },
                                    hover: { scaleX: 1 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />

                            {/* Scroll effect overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                variants={{
                                    initial: { x: '-100%' },
                                    hover: { x: '100%' }
                                }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent"></div>

                {/* Floating particles */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </motion.section>
    );
};

export default ContactComponent;