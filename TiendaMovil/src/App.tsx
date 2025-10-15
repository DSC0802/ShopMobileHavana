import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Stock from './components/Stock';
import { AuthProvider } from './context/AuthContext';
function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                <Header />
                <main>
                    <Hero />
                    <Services />
                    <Stock />
                    <About />
                    <Contact />
                </main>
                <Footer />
            </div>
        </AuthProvider>
    )
};

export default App;
