import React from "react";

function Footer() {
    return(
        <section className="footer-section">
        <button type="button" className=" social-icon btn btn-sm twitter-button"><i className="fab fa-twitter"></i></button>
        <button type="button" className="social-icon btn btn-sm facebook-button"><i className="fab fa-facebook"></i></button>
        <button type="button" className="social-icon btn btn-sm facebook-button"><i className="fab fa-instagram-square"></i></button>
        <button type="button" className="social-icon btn btn-sm email-button"><i className="fas fa-envelope-open"></i></button>
        <p> @Copyright 2021 -AvoMonk</p>
      </section>
    )
}
export default Footer;
