import React from 'react'
import Link from "next/link";


class NavigationRight extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nav buttons">
                <a href="https://medium.com/nteract" target="_blank" className="nav-item">
                    Atom
                </a>
                <Link as="/kernels" >
                    <a href="/kernels" prefetch className="nav-item">Kernels</a>
                </Link>
                <a href="https://medium.com/nteract" target="_blank" className="nav-item">
                    Desktop
                </a>
            </div>
        )
    }
}


export default NavigationRight