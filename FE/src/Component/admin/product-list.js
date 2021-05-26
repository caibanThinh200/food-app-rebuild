import { useEffect } from "react"
import { useContext } from "react"
import { context } from "../../Context/Context"
import { Table, Modal, Tag } from 'antd'
import { useState } from "react"

const { Column } = Table
const Products = () => {
    const {
        API_URL,
        product,
        getProduct,
        cate,
        getCate,
    } = useContext(context)
    const [visible, setVisible] = useState(false)
     useEffect(() => {
        getProduct();
        getCate();
    }, [])
    const [detail, setDetail] = useState({})
    const handleViewDetail = (data) =>{
        setDetail(data)
        setVisible(true)
    }
    return (
        <div className="container">
            <Modal
                title="View detail"
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                width={1000}
                footer={false}
            >
                <div className="container-flud" style={{minHeight:'50vh'}}>
                    <div className="row">
                        <div className="col-md-4">
                            <img className="admin-detail-image" src={API_URL + "/images/" + detail.image} alt=""/>
                        </div>
                        <div className="col-md-8 product-detail">
                            <h3>{detail.nameFood} <i class="fal fa-utensils-alt"></i></h3>
                            <p id="detail-price"> Price: <b><span className="text-danger">{detail.price} VND</span></b></p>
                            <Tag id="detail-cate" color="#d4b106"> {detail.cateName} </Tag>
                            <p id="detail-address"><i class="fal fa-map-marker-alt"></i>  Address: {detail.foodAddress} </p>
                        </div>
                        <div className="col-12">
                            <div className="detail-description">
                                <h6>Description</h6>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, alias reprehenderit. Adipisci velit amet optio deserunt odit. Expedita est, et laboriosam rerum, earum ipsum quod maiores aliquid veritatis illo culpa.</p>
                            </div>
                            </div>
                    </div>
                </div>
            </Modal>
            <Table
                dataSource={product}
                bordered
            >
                <Column title="Name" dataIndex="nameFood" key="nameFood" />
                <Column title="Category" dataIndex="cateName" key="cateName" />
                <Column title="Price"  key="price" 
                    render={data=>(
                        <span> {data.price} VND</span>
                    )}
                />
                <Column title="Address" dataIndex="foodAddress" key="foodAddress" />
                <Column title="Action" key="action" width="152px"
                    render={action => (
                        <div className="d-flex">
                            <button onClick={()=>handleViewDetail(action)} className="btn-detail">Detail</button>
                            <button className="btn-edit">Edit</button>
                        </div>
                    )}
                />
            </Table>
        </div>
    )
}
export default Products