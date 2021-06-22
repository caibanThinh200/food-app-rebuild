import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Bill from "./Bill";
import { context } from "../Context/Context";
import { useParams } from "react-router-dom";
import create from "@ant-design/icons/lib/components/IconFont";
import { useJwt } from "react-jwt";

const ListBill = (props) => {
  const { API_URL, token, getBillAndUser, userId, userInf, bill } = useContext(context);
  console.log(bill);
  useEffect(() => {
    getBillAndUser();
  }, [JSON.stringify(userInf)]);

  return (
    <div style={{marginBottom:'50px'}}>
      <div
        style={{ marginTop: "50px", marginBottom: "50px" }}
        className="voucher"
      >
        <h1 style={{textAlign:'center'}}>Payment history</h1>
      </div>
      {bill !== undefined ? (
        bill.map(({ idBill, created_at, note, total }) => (
          <Bill
            key={idBill}
            idBill={idBill}
            created_at={created_at}
            note={note}
            total={total}
            fullname={userInf.Fullname}
          />
        ))
      ) : (
        <div>No bill</div>
      )}
    </div>
  );
};
export default ListBill;
