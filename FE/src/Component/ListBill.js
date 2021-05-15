import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Bill from "./Bill";
import { context } from "../Context/Context";
import { useParams } from "react-router-dom";
import create from "@ant-design/icons/lib/components/IconFont";
import { useJwt } from "react-jwt";

const ListBill = (props) => {
  const [bill, setBill] = useState([]);
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState([]);
  const { API_URL } = useContext(context);
  const token = JSON.parse(localStorage.getItem("token")) || "";
  const { decodedToken } = useJwt(token.token);

  const getBillAndUser = () => {
    axios
      .get(API_URL + "/User/s/userprofile", {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((res) => {
        setUserId(res.data[0].UserId);
        setUser(res.data[0]);
      })
      .then(() => {
        if (userId !== "") {
          axios.get(API_URL + "/Bill/u/" + userId).then((res) => {
            setBill(res.data.data);
          });
        }
      });
  };

  useEffect(() => {
    getBillAndUser();
  }, [JSON.stringify(userId)]);

  return (
    <div>
      <div
        style={{ marginTop: "50px", marginBottom: "100px" }}
        className="voucher"
      >
        <h1>Payment history</h1>
      </div>
      {bill !== undefined ? (
        bill.map(({ idBill, created_at, note, total }) => (
          <Bill
            key={idBill}
            idBill={idBill}
            created_at={created_at}
            note={note}
            total={total}
            fullname={user.Fullname}
          />
        ))
      ) : (
        <div>No bill</div>
      )}
    </div>
  );
};
export default ListBill;
