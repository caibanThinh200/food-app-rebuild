import { Form, Input, InputNumber, Select } from 'antd'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { context } from '../../Context/Context';
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};
const {Option} = Select
const AddProduct = () => {
    const [form] = Form.useForm()
    const {
        API_URL,
        cate,
        getCate,
    } = useContext(context),
    [imageURL, setImageURL] = useState(""),
    [info, setInfo] = useState({})
    useEffect(()=>{
        getCate()
    },[])
    const handleChange = (e) => {
        
        const newInfo = {
            [e.target.name]: e.target.value
        }
        setInfo({...info, ...newInfo})
    }
    const handleChangeFile = (e) => {
        const newInfo = {
            [e.target.name]: [e.target.files[0],e.target.files[0].name]
        }
        setInfo({...info, ...newInfo})
    }
    const handleChangeSelection = (e,value) => {
        console.log(e,value);
        const newInfo = {
            [e.name]: value
        }
        setInfo({...info, ...newInfo})
    }

    const handleAddNewProduct = (value) => {
        const form = new FormData();
        Object.entries(info).map(e => {
            if(e[0] === "image") {
                form.append(e[0],e[1][0],e[1][1])
            }
            else {
                form.append(e[0],e[1])
            }
        })

        axios.post("http://localhost:3010" + "/Home", form)
        .then(res => {
            console.log(res);
        })
    }
    return (
        <div className="container bg-white">
            <div className="row">
                <div className="col-md-6">
                    <Form
                        {...layout}
                        form ={form}
                        onFinish={handleAddNewProduct}
                        name="basic"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item className="form-item-1" wrapperCol={{ span: 24}}>
                            <h5>Add new food</h5>
                        </Form.Item>
                        <Form.Item
                            label="Food name"
                            name="nameFood"
                            rules={[{ required: true, message: 'Please input your name!'}]}
                        >
                            <Input name="nameFood" onChange={handleChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Food address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input name="address" onChange={handleChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Food image"
                            name="image"
                            rules={[{ required: true, message: 'Please choose your image!' }]}
                        >
                            <Input name="image" type="file" onChange={handleChangeFile}/>
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="idCate"
                            rules={[{ required: true, message: 'Please choose your category!' }]}
                        >
                            <Select
                                placeholder="Select your food category"
                                allowClear
                                name="idCate"
                                onChange={(value,e) => handleChangeSelection(e,value)}
                            >
                                {cate.map(category=>(
                                    <Option name="idCate" value={category.idCategory}> {category.nameCategory} </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input price!' }]}
                            onChange={handleChange}
                        >
                            <InputNumber name="price" style={{width:'50%'}} />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <button className="btn-add-product bg-warning">Confirm</button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="col-md-6 ">
                    <img className="card-img" src={process.env.PUBLIC_URL + "/logo-food-app.jpg"} alt=""/>
                </div>
            </div>
        </div>
    );
}
export default AddProduct