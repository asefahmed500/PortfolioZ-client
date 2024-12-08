
import ContactMe from "../ContactMe/ContactMe";
import Footer from "../Footer/Footer";
import Intro from "../Intro/Intro";
import NavBar from "../NavBar/NavBar";

import Testimonials from "../Testimonials/Testimonials";
import Features from "../ViewPortfolio/Features/Features";


const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Intro></Intro>


            <Features></Features>
            <Testimonials></Testimonials>
            
            <ContactMe></ContactMe>
            <Footer></Footer>
        </div>
    );
};

export default Home;