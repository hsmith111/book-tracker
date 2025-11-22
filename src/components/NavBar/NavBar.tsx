import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/current">Currently Reading</Link></li>
                    <li><Link to="/tbr">To Be Read</Link></li>
                    <li><Link to="/done">Done</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;