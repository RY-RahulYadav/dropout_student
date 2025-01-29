import React from 'react';
import "../../styles/section5.css"

const events = [
    {
        id: 1,
        imgSrc: 'https://mehedi.asiandevelopers.com/govarnex-demo/assets/images/resources/events-v1-img1.jpg',
        title: 'The Youth Event – Things To Remember',
        time: '08.00AM - 06.00PM',
        location: 'New Hyde Park, NY 11040',
        link: 'event-details.html',
        animationDelay: '0.1s',
    },
    {
        id: 2,
        imgSrc: 'https://mehedi.asiandevelopers.com/govarnex-demo/assets/images/resources/events-v1-img2.jpg',
        title: 'Street San Antonio Sketches & Urban History',
        time: '08.00AM - 06.00PM',
        location: 'New Hyde Park, NY 11040',
        link: 'event-details.html',
        animationDelay: '0.2s',
    },
    {
        id: 3,
        imgSrc: 'https://mehedi.asiandevelopers.com/govarnex-demo/assets/images/resources/events-v1-img3.jpg',
        title: 'Protest of Violence Against Women Rights',
        time: '08.00AM - 06.00PM',
        location: 'New Hyde Park, NY 11040',
        link: 'event-details.html',
        animationDelay: '0.3s',
    },
];

const Section5 = () => {
    const usertype="student"
    return (
        <section className="events-style1">
            <div
                className="events-style1__bg"
                style={{ backgroundImage: 'url(assets/images/backgrounds/events-v1-bg.png)' }}
            ></div>
            <div className="auto-container">
                <div className="sec-title text-center">
                    <div className="sub-title">
                        <h6>Upcoming Events</h6>
                    </div>
                    <h2>Explore Upcoming City <br /> Event Schedule</h2>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="events-style1__inner">
                            {events.map(event => (
                                <div
                                    key={event.id}
                                    className="events-style1__single wow animated fadeInUp animated"
                                    data-wow-delay={event.animationDelay}
                                    style={{
                                        visibility: 'visible',
                                        animationDelay: event.animationDelay,
                                        animationName: 'fadeInUp',
                                    }}
                                >
                                    <div className="events-style1__single-left">
                                        <div className="img-box">
                                            <img src={event.imgSrc} alt="#" />
                                        </div>
                                        <div className="title">
                                            <h2>
                                                <a href={event.link}>{event.title}</a>
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="events-style1__single__right">
                                        <ul className="contact-info">
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-wall-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>{event.time}</p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>{event.location}</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="events-style1__single__right-btn">
                                            <a className="btn-one" href={event.link}>
                                                <span className="txt">Read More</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="events-style1__btn text-center">
                                <a className="btn-one" href="event-details.html">
                                   {usertype=="student"?<span className="txt text-black" >More Events</span>:<span className="txt text-black" >Add Events</span>}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section5;
