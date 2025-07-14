import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = ({ isVisible }) => {
    const socialLinks = [
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Youtube, href: '#', label: 'YouTube' }
    ];

    const navigationLinks = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Work', href: '#', count: 6 },
        { name: 'Contact', href: '#' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.footer
            className="bg-white px-36 overflow-y-hidden"
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <div className="mx-auto">
                <div className="">
                    <motion.div
                        className="mb-8 lg:mb-0"
                        variants={itemVariants}
                    >
                        <nav className="space-y-6">
                            {navigationLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    whileHover={{ x: 8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <a
                                        href={link.href}
                                        className="text-6xl lg:text-8xl font-bold font-poppins text-black hover:text-gray-600 transition-colors duration-300 block leading-none"
                                    >
                                        {link.name}
                                        {link.count && (
                                            <span className="text-3xl lg:text-4xl align-top ml-2">
                                                ({link.count})
                                            </span>
                                        )}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>

                    <motion.div
                        className="text-right"
                        variants={itemVariants}
                    >
                        <div className="flex space-x-4 justify-end">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-black hover:bg-gray-300 transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>

                        <motion.div
                            className="text-gray-600 space-y-2"
                            variants={itemVariants}
                        >
                            <p className="text-sm">(Inquiries)</p>
                            <motion.a
                                href="mailto:john@jt-studio.com"
                                className="text-lg font-medium text-black hover:text-gray-600 transition-colors duration-300 block"
                                whileHover={{ scale: 1.05 }}
                            >
                                john@jt-studio.com
                            </motion.a>
                            <p className="text-sm mt-4">(Phone)</p>
                            <motion.a
                                href="tel:+491234567890"
                                className="text-lg font-medium text-black hover:text-gray-600 transition-colors duration-300 block"
                                whileHover={{ scale: 1.05 }}
                            >
                                +49 1234 56789
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;