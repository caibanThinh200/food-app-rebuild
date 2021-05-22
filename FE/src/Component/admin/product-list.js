import { useEffect } from "react"
import { useContext } from "react"
import { context } from "../../Context/Context"
import {Table} from 'antd'
const columns = [
    {
    title:"Name",
    key:"nameFood",
    dataIndex: "nameFood",
    },
    {
    title:"Price",
    key:"price",
    dataIndex: "price",

    },
    {
    title:"Category",
    key:"idCategory",
    dataIndex: "idCategory",
    },
]
const Products = () =>{
    const {
        API_URL,
        product,
        getProduct,
        cate,
        getCate,
    } = useContext(context)
    useEffect(()=>{
        getProduct();
        getCate();
    },[])

    return(
        <div>
            <Table
                
                columns={columns} 
                dataSource={product}
                bordered
            />
        </div>
    )
}
export default Products