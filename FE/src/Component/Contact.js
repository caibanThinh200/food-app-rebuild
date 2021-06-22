import React from "react";
function Contact(props) {
  return (
    <div className="container-fluid">
      <div className="row contact-top">
        <div className="col-md-3">

        </div>
        <div className="col-md-6">
          <h5>Fill your email in here to recieve the gift info </h5>
          <div className="d-flex subcribe-us">
            <input type="text"/>
            <button>Subcribe</button>
          </div>
          <h5 className="text-muted">Click here for your respone, rates and we have a gift for u from FoodApp</h5>
          <h6>By sending, u have agreed to all the terms</h6>
        </div>
        <div className="col-md-3"></div>
      </div>
      <div className="container-contact">
        <div className="row">
          <div className=" col-md-4">
            <h2 id="logo">FoodApp</h2>
            <p style={{ width: '80%' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero officia cum rerum facilis! Quos incidunt mollitia, obcaecati commodi quis at consequuntur laboriosam iste nemo corrupti, molestiae suscipit recusandae dolor eius!</p>
          </div>
          <div className=" col-md-3">
            <h3>Contact</h3>
            <div style={{ width: '90%' }}>
              <div className="d-flex">
                <i class="fal fa-envelope-open-text" style={{ marginRight: '10px' }}></i><h6>Thinhdev20@gmail.com</h6>
              </div>
              <div className="d-flex">
                <i className="fal fa-phone" style={{ marginRight: '10px' }}></i><h6>0364373104</h6>
              </div>
              <div className="d-flex">
                <i class="fal fa-map-marker-alt" style={{ marginRight: '10px' }}></i><h6>155 Sư Vạn Hạnh street Ho Chi Minh City</h6>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <h3>Help</h3>
            <h6>FAQs</h6>
            <h6>Service</h6>
          </div>
          <div className="col-md-3">
            <h3>Follow us</h3>
            <p className="text-light">Follow us on our social media for more information</p>
            <div className="d-flex">
              <p className="footer-icon">
                <i className="fab fa-facebook-f"></i>
              </p>
              <p className="footer-icon">
                <i className="fab fa-twitter"></i>
              </p>
              <p className="footer-icon">
                <i className="fab fa-youtube"></i>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="divide"></div>
          <h6>Copyright <i class="far fa-copyright"></i> 2021 by TND Team</h6>
        </div>
      </div>
    </div>
  );
}
export default Contact;
