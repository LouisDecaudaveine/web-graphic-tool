import React from "react";
import { Link } from 'react-router-dom';

export default function Header(props) {

    return(
        <div className="header">
            <h1 className="websiteTitle">Stinky's Playground</h1>
            <nav>
                <ul className="navigator">
                    <li className="navItem"><Link to="/" className="navItem">Home</Link></li>
                    <li className="navItem"><Link to="/about" className="navItem">About</Link></li>
                    <li className="navItem"><Link to="/tutorial" className="navItem">Tutorial</Link></li>
                </ul>
            </nav>
        </div>
    )

}