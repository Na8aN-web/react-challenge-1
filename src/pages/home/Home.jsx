import { motion, useScroll } from 'framer-motion';
import Layout from '../../components/Layout';
import Header from "./components/Header";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import ContactComponent from "./components/Contact";

const Home = () => {
    const { scrollYProgress } = useScroll();

    return (
        <Layout>
            <Header />
            <About />
            <Portfolio />
            <ContactComponent />
            
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-20"
                style={{ scaleX: scrollYProgress }}
            />
        </Layout>
    );
};

export default Home;