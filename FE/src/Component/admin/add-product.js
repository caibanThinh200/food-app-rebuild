import { Form, Input, InputNumber, Select } from 'antd'
import { useEffect } from 'react';
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
    } = useContext(context)
    useEffect(()=>{
        getCate()
    },[])
    const handleAddNewProduct = (value) =>{
        console.log(value)
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
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Food address"
                            name="foodAddress"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="idCategory"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select
                                placeholder="Select your food category"
                                allowClear
                            >
                                {cate.map(category=>(
                                    <Option value={category.idCategory}> {category.nameCategory} </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <InputNumber style={{width:'50%'}} />
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