import React from 'react'

const Home = () => {
    return(
        <>
        <div class="site-section site-hero">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-md-10">
                <span class="d-block mb-3 caption" data-aos="fade-up" data-aos-delay="100">Conference 2020</span>
                <h1 class="d-block mb-4" data-aos="fade-up" data-aos-delay="200">Web Development Conference 2020</h1>
                <span class="d-block mb-5 caption" data-aos="fade-up" data-aos-delay="300">[...upcoming, September 6th-7th, Minnesota, US]</span>
                <a href="/events" class="btn-custom" data-aos="fade-up" data-aos-delay="400"><span>Book Now!</span></a>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Home