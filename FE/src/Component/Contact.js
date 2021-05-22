import React from "react";
function Contact(props) {
  return (
    <div className="container-contact">
      <div className="row">
        <div className=" col-sm">
          <h3>Uber EATS</h3>
          <h6>Visit help center</h6>
        </div>
        <div className=" col-sm">
          <h3>Contact</h3>
          <h6>Email:thinhdev20@gmail.com</h6>
          <h6>Phone number:0364373104</h6>
          <h6>Addr:789 aaaaaaaa</h6>
        </div>
        <div className="col-sm">
          <h3>About us</h3>
          <h6>
            <i className="fab fa-facebook"></i> Faceboook
          </h6>
          <h6>
            <i className="fab fa-instagram"></i> Instagram
          </h6>
          <h6>
            <i className="fab fa-twitter"></i> Twitter
          </h6>
        </div>
      </div>
    </div>
  );
}
export default Contact;
