import { useEffect } from "react"
import { useContext } from "react"
import { context } from "../../Context/Context"
import { Table, Modal, Tag, Form, Input, InputNumber, message } from 'antd'
import { useState } from "react"
import axios from "axios"

const { Column } = Table
const {TextArea} = Input
const Products = () => {
    const {
        API_URL,
        product,
        getProduct,
        cate,
        getCate,
    } = useContext(context)
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [editFormVisible, setEditFormVisible] = useState(false)
    const [imageURL, setImageURL] = useState('')
    const [id, setId] = useState('')
    const[render,setRender] = useState(0)
     useEffect(() => {
        getProduct();
        getCate();
    }, [render])
    const [detail, setDetail] = useState({})
    const handleViewDetail = (data) =>{
        setDetail(data)
        setVisible(true)
    }
    const handleEdit = (data) =>{
        setEditFormVisible(true)
        form.setFieldsValue(data)
        setId(data.idProduct)
    }
    const onFinish = (data) =>{
        const formData = new FormData();
        const {description, nameFood, price, foodAddress} = data
        if(imageURL){
            formData.append("image", imageURL, imageURL.name);
        }
        formData.append("nameFood", nameFood)
        formData.append("price", price)
        formData.append("address", foodAddress)
        formData.append("description", description)
        formData.forEach(element => {
            console.log(element);
          });
        axios.put(API_URL+"/home/"+id, formData)
          .then(res=>{
              setEditFormVisible(false)
              message.success('Update successed')
              setRender(render+1)
          })
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
                            <h6> Saled: {detail.saled || 0} </h6>
                            <h6>Description</h6>
                                <p>{detail.description}</p>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal footer={false} title="Edit product" visible={editFormVisible} onCancel={()=>setEditFormVisible(false)}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        className="p-2"
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                    >
                        <Form.Item
                            label="Name"
                            name="nameFood"
                            rules={[{required: true, message: "Please input name"}]}
                        >
                            <Input/>
                        </Form.Item>
                        <div className="row" style={{padding:'0'}}>
                            <div className="col-6" style={{padding:'0'}}>
                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[{required: true, message: "Please input price"}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                            <div className="col-6" style={{padding:'0', paddingLeft:'10px'}}>
                                <Form.Item
                                    label="Sale off"
                                    name="foodAddress"
                                    rules={[{required: true, message: "Please input description"}]}
                                >
                                    <InputNumber/>
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item
                            label="Description "
                            name="description"
                            rules={[{required: true, message: "Please input description"}]}
                        >
                            <TextArea/>
                        </Form.Item>
                        <Form.Item
                            label="Image"
                        >
                            <input type="file" onChange={(e) => setImageURL(e.target.files[0])} />
                        </Form.Item>
                        <Form.Item>
                            <button className="btn-edit-food" type="submit">Edit</button>
                        </Form.Item>
                    </Form>
            </Modal>
            <Table
                dataSource={product}
                bordered
            >
                <Column width="120px" title="Image" key="image" render={data =>(
                    <img className="table-image" src={API_URL+"/images/"+data.image}/>
                )}
                />
                <Column title="Name" dataIndex="nameFood" key="nameFood" />
                <Column title="Category" dataIndex="cateName" key="cateName" />
                <Column title="Price"  key="price" 
                    render={data=>(
                        <span> {new Intl.NumberFormat().format(data.price)} VND</span>
                    )}
                />
                <Column title="Action" key="action" width="152px"
                    render={action => (
                        <div className="d-flex">
                            <button onClick={()=>handleViewDetail(action)} className="btn-detail">Detail</button>
                            <button onClick={()=>handleEdit(action)} className="btn-edit">Edit</button>
                        </div>
                    )}
                />
            </Table>
        </div>
    )
}
export default Products