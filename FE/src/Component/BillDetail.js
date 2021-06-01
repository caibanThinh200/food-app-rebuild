import { Button } from "antd";
import Item from "antd/lib/list/Item";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../Context/Context";
const BillDetail = (props) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const total = JSON.parse(localStorage.getItem("billTotal"));
  const { API_URL } = useContext(context);
  const getproductsInBill = () => {
    fetch(API_URL + "/Bill/p/" + id)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.data);
      });
  };

  useEffect(() => {
    getproductsInBill();
  }, [JSON.stringify(products)]);

  return (
    <div>
      <section className="jumbotron text-center">
        {/* <h6
          onClick={() => {
            window.history.back();
          }}
          style={{ float: "left" }}
        >
          Back
        </h6> */}
        <div className="container">
          <div className="voucher">
          <h1 className="jumbotron-heading">Uber Bill</h1>
          </div>
        </div>
      </section>
      <div className="container mb-4">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">products</th>
                <th scope="col">Available</th>
                <th scope="col" className="text-center">
                  Quantity
                </th>
                <th scope="col" className="text-right">
                  Price
                </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map(({ image, nameFood, count, idProduct, price }) => (
                  <tr key={idProduct}>
                    <td>
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={API_URL + "/images/" + image}
                      />{" "}
                    </td>
                    <td>
                      <h4>{nameFood}</h4>
                    </td>
                    <td>In stock</td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={count}
                      />
                    </td>
                    <td className="text-right"> {new Intl.NumberFormat().format(price)} VND</td>
                  </tr>
                ))
              ) : (
                <div>Loading...</div>
              )}
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td>Sub-Total</td>
                <td className="text-right">0$</td>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td>Shipping</td>
                <td className="text-right">{3}$</td>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td>
                  <strong>Total</strong>
                </td>
                <td className="text-right">
                  <strong>{total + 3}$</strong>
                </td>
              </tr>
              <button className="btn btn-danger">Cancel this bill</button>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default BillDetail;
