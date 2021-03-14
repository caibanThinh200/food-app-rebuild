import React from "react"
function Contact(props){
    return(
        <div  className="container-contact">
            <div className="row">
                <div className=" col-sm">
                    <h1>Uber EATS</h1>
                    <h4 className="border-hover">Visit help center</h4>
                </div>
                <div className=" col-sm">
                        <h1>Contact</h1>
                        <h4>Email:thinhdev20@gmail.com</h4>
                        <h4>Phone number:0364373104</h4>
                        <h4>Addr:789 aaaaaaaa</h4>
                </div>
                <div className="col-sm">
                    <h1>About us</h1>
                    <h4><i className="fab fa-facebook"></i> Faceboook</h4>
                    <h4><i className="fab fa-instagram"></i> Instagram</h4>
                    <h4><i className="fab fa-twitter"></i> Twitter</h4>
                </div>
            </div>
        </div>
    )
}
export default Contact