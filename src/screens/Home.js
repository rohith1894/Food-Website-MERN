import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function Home() {

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
