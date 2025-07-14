import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BottomFooter = () => {
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

    const footerLinks = [
        { name: 'Imprint', href: '#' },
        { name: 'Privacy Policy', href: '#' }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        < motion.div
            className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200"
            variants={itemVariants}
        >
            <div className="flex space-x-8 mb-4 sm:mb-0">
                {footerLinks.map((link) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-300 text-sm"
                        whileHover={{ y: -2 }}
                    >
                        {link.name}
                    </motion.a>
                ))}
            </div>

            <motion.button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors duration-300 text-sm"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <ArrowUp size={16} />
                <span>Back to top</span>
            </motion.button>
        </motion.div >
    )
}

export default BottomFooter