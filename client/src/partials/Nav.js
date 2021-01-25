import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (props) => {

    let rightNav = ''
    if(props.role) {
        rightNav = (<li><Link to="/logout">Logout</Link></li>)
    } else {
        rightNav = (
            <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            </>
        )
    }

    return(
        <>
        <div class="site-mobile-menu">
            <div class="site-mobile-menu-header">
                <div class="site-mobile-menu-close mt-3">
                <span class="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
            <div class="site-mobile-menu-body"></div>
        </div>
            
        <header class="site-navbar py-3" role="banner">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-11 col-xl-2">
                        <h1 class="mb-0"><a href="index.html" class="text-white h2 mb-0">WebDev•<span class="text-primary">Con</span> </a></h1>
                    </div>
                    <div class="col-12 col-md-10 d-none d-xl-block">
                        <nav class="site-navigation position-relative text-right" role="navigation">
                            <ul class="site-menu js-clone-nav mx-auto d-none d-lg-block">
                                <li><Link to="/">Home</Link></li>
                                <li><a href="#">About Us</a></li>
                                <li><Link to="/events">Events</Link></li>
                                <li><Link to="/bookings">Bookings</Link></li>
                                <li><a href="#">Contacts</a></li>
                                {
                                    rightNav
                                }
                            </ul>
                        </nav>
                    </div>
                    <div class="d-inline-block d-xl-none ml-md-0 mr-auto py-3" style={{position: 'relative', top: '3px'}}><a href="#" class="site-menu-toggle js-menu-toggle text-white"><span class="icon-menu h3"></span></a></div>
                </div>
            </div>
        </header>
        </>
    )
}

export default Nav