import { useContext } from "react";
import { context } from "../Context/Context";
import { Link } from "react-router-dom";
function About(props) {
  const { setVisible, visible, showModal } = useContext(context);

  return (
    <div className="about-container marketing">
      <div
        className="voucher textAlignCenter"
        style={{ marginBottom: "100px" }}
      >
        <h1>Our service</h1>
      </div>

      <div className="featurette-row container">
        <div className="row heading-row ">
          <div className="card-container col-md-4">
            <div className="card-box ">
              <div className="front textAlignCenter">
                <img src={process.env.PUBLIC_URL + "/food.png"} />
                <br />
                <br />
                <h1>Food delivery</h1>
              </div>
              <div className="back">
                <h1>Food delivery</h1>

                <h3>Discover new food on our app</h3>
                <br />
                <h4>
                  We give to you all the food from the restaurant that you love
                  explore new foods
                </h4>
                <button className="btn btn-primary">Order now</button>
              </div>
            </div>
          </div>
          <div className="card-container col-md-4">
            <div className="card-box">
              <div className="front textAlignCenter">
                <img src={process.env.PUBLIC_URL + "/taxi.png"} />
                <br />
                <br />
                <h1>Transporting</h1>
              </div>
              <div className="back ">
                <h1>Request a ride now</h1>
                <br />
                <h4>
                  Greater transparency for shippers and carriers to do business
                  together.
                </h4>
                <button className="btn btn-primary">Book now</button>
              </div>
            </div>
          </div>
          <div className="card-container col-md-4">
            <div className="card-box  ">
              <div className="front textAlignCenter">
                <img src={process.env.PUBLIC_URL + "/delivery-guy.png"} />
                <br />
                <br />
                <h1>Be our employees</h1>
              </div>
              <div className="back">
                <h1>Be one of our employees</h1>
                <br />
                <h4>
                  Uber for Business helps to simplify business travel,
                  expensing, and customer experiences.
                </h4>
                <button
                  onClick={() => {
                    showModal();
                  }}
                  className="btn btn-primary"
                >
                  Register now
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-6">
            <h2 className="featurette-heading">
              First featurette heading.{" "}
              <span className="text-muted">It'll blow your mind.</span>
            </h2>
            <p className="lead">
              Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
              ligula porta felis euismod semper. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus
              commodo.
            </p>
          </div>
          <div className="col-md-6  floatLeft">
            <img
              className="featurette-image img-fluid mx-auto"
              src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iE_HajpA5qVQ/v1/1000x-1.jpg"
              alt="Generic placeholder image"
            />
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="floatRight col-md-6 ">
            <img
              className="featurette-image img-fluid mx-auto"
              src="https://cdnuploads.aa.com.tr/uploads/Contents/2020/02/05/thumbs_b_c_b214ea0a6f6833bfd94c36198b0ec552.jpg?v=222548"
              alt="Generic placeholder image"
            />
          </div>
          <div className="col-md-6 ">
            <h2 className="featurette-heading">
              Our commitment to your safety
            </h2>
            <p className="lead">
              With every safety feature and every standard in our Community
              Guidelines, we're committed to helping to create a safe
              environment for our users.
            </p>
          </div>
        </div>

        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-6">
            <h2 className="featurette-heading">
              Setting{" "}
              <span className="text-muted">10,000+ cities in motion</span>
            </h2>
            <p className="lead">
              The app is available in thousands of cities worldwide, so you can
              request a ride even when you’re far from home.
            </p>
          </div>
          <div className="col-md-6 floatLeft">
            <img
              className="featurette-image img-fluid mx-auto"
              src="https://www.euractiv.com/wp-content/uploads/sites/2/2020/03/w_53783872-800x450.jpg"
              alt="Generic placeholder image"
            />
          </div>
        </div>

        <hr className="featurette-divider"></hr>
      </div>
    </div>
  );
}
export default About;
