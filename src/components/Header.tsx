import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-center px-6 shadow-sm">
            <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="숲도담" className="h-10 w-auto object-contain" />
            </Link>
        </header>
    );
}
