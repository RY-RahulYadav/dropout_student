import "../../styles/footer.css"

import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-area">
            <div className="footer-area__shape1">
                <img
                    src="https://mehedi.asiandevelopers.com/govarnex-demo/assets/images/shapes/footer-v1-shape1.png"
                    alt="#"
                />
            </div>
            {/* Start Footer */}
            <div className="footer">
                <div className="auto-container">
                    <div className="row">
                        {/* Start single footer widget */}
                        <div
                            className="col-xl-3 col-lg-6 col-md-6 col-sm-12 wow animated fadeInUp animated"
                            data-wow-delay="0.1s"
                            style={{
                                visibility: 'visible',
                                animationDelay: '0.1s',
                                animationName: 'fadeInUp',
                            }}
                        >
                            <div className="single-footer-widget">
                                <div className="our-company-info">
                                    <div className="flex items-center ">
                                        <a href="index.html">
                                            <img className="w-[5rem] h-[5rem]"
                                                src="/final_logo.png"
                                                alt="Awesome Logo"
                                                title=""
                                            />
                                        </a>
                                        <p className="text-2xl text-white">LearnAgain</p>
                                    </div>
                                    <div className="our-company-info__text">
                                        <p>
                                            Tincidunt neque pretium lectus donec risus. Mauris mi tempor nunc orc leo
                                            consequat vitae erat gravida lobortis nec et sagittis.
                                        </p>
                                    </div>
                                    <ul className="our-company-info__social-link">
                                        <li>
                                            <a href="#">
                                                <span className="icon-facebook-app-symbol"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span className="icon-twitter"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span className="icon-instagram"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* End single footer widget */}

                        {/* Start single footer widget */}
                        <div
                            className="col-xl-3 col-lg-6 col-md-6 col-sm-12 wow animated fadeInUp animated"
                            data-wow-delay="0.3s"
                            style={{
                                visibility: 'visible',
                                animationDelay: '0.3s',
                                animationName: 'fadeInUp',
                            }}
                        >
                            <div className="single-footer-widget single-footer-widget--explore">
                                <div className="title">
                                    <h3>Explore</h3>
                                </div>
                                <div className="footer-widget-links">
                                    <ul>
                                        <li><a href="#">Employment & Jobs</a></li>
                                        <li><a href="#">Government & Elections</a></li>
                                        <li><a href="#">Real Estate & Buildings</a></li>
                                        <li><a href="#">Health & Medical</a></li>
                                        <li><a href="#">Transport & Traffic</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* End single footer widget */}

                        {/* Start single footer widget */}
                        <div
                            className="col-xl-3 col-lg-6 col-md-6 col-sm-12 wow animated fadeInUp animated"
                            data-wow-delay="0.5s"
                            style={{
                                visibility: 'visible',
                                animationDelay: '0.5s',
                                animationName: 'fadeInUp',
                            }}
                        >
                            <div className="single-footer-widget single-footer-widget--links">
                                <div className="title">
                                    <h3>Useful Links</h3>
                                </div>
                                <div className="footer-widget-links">
                                    <ul>
                                        <li><a href="#">Administration</a></li>
                                        <li><a href="#">Fire Services</a></li>
                                        <li><a href="#">Business & Taxation</a></li>
                                        <li><a href="#">Circulars And Go’s</a></li>
                                        <li><a href="#">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* End single footer widget */}

                        {/* Start single footer widget */}
                        <div
                            className="col-xl-3 col-lg-6 col-md-6 col-sm-12 wow animated fadeInUp animated"
                            data-wow-delay="0.7s"
                            style={{
                                visibility: 'visible',
                                animationDelay: '0.7s',
                                animationName: 'fadeInUp',
                            }}
                        >
                            <div className="single-footer-widget footer-widget--contact">
                                <div className="title">
                                    <h3>Contact</h3>
                                </div>
                                <div className="footer-widget--contact-info">
                                    <div className="footer-widget--contact-info-text">
                                        <p>
                                            Tortor neque sed tellus est eget dui id ante tristique tristique dolor.
                                        </p>
                                    </div>
                                    <ul>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>New Hyde Park, NY 11040</p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-mail-1"></span>
                                            </div>
                                            <div className="text">
                                                <p><a href="mailto:yourmail@email.com">example@govarnex.com</a></p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-telephone"></span>
                                            </div>
                                            <div className="text">
                                                <p><a href="tel:3336660000">333 666 0000</a></p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* End single footer widget */}
                    </div>
                </div>
            </div>
            {/* End Footer */}

            <div className="footer-bottom">
                <div className="container">
                    <div className="bottom-inner text-center">
                        <div className="copyright">
                            <p>Copyright 2023 by <a href="#">LearnAgain</a> All Right Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
