
import React from 'react';

const testimonialsData = [
    { name: 'Prophet Muhammad (ﷺ)', feedback: 'The best among you are those who bring the greatest benefit to others.' },
    {  name:'   .. ',feedback: 'A masjid is the heart of a community.' },
    {  name:'Quran 2:277 ',feedback: 'Those who establish prayer and give to charity are among the righteous.' },
    {  name:'Prophet Muhammad (ﷺ)',feedback: 'The believers shade on the Day of Resurrection will be his charity.' },
];

const Testimonials = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center"></h2>
            <div className="row">
                {testimonialsData.map((testimonial, index) => (
                    <div className="col-md-6" key={index}>
                        <div className="card mb-4 text-center">
                            <div className="card-body">
                                <p className="card-text">"{testimonial.feedback}"</p>
                                <h5 className="card-title">{testimonial.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
