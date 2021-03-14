import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {context} from "../Context/Context"
import { PageHeader, Button, Descriptions } from 'antd';
import {Link} from "react-router-dom"
const Bill = (props) =>{
    const {API_URL} = useContext(context) 
    const [bill,setBill] = useState([]);
    const [product,setProduct] = useState([]);
    const {idBill,created_at,note,fullname,total} = props;
    
    
   
    return (

      <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
     
      title={"Bill id: " + idBill}
      
      extra={[
      
        <Button key="1" type="primary">
          <Link onClick={()=>{localStorage.setItem("billTotal",JSON.stringify(total))}} to={"/bill/" + idBill}> Detail </Link>
        </Button>,
      ]}
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="Customer name">{fullname}</Descriptions.Item>
       
        <Descriptions.Item label="Creation Time">{created_at}</Descriptions.Item>
        
        <Descriptions.Item label="Total">
         {total}$
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  </div>
      );
}
export default Bill