import { Menu, Modal, Switch, Form, Input, message } from 'antd';
import { HomeOutlined, SettingOutlined, FileDoneOutlined, LockOutlined, ContainerOutlined, PlusOutlined, BarChartOutlined, UserOutlined } from '@ant-design/icons';
import '../../style/admin.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { context } from '../../Context/Context';
const { SubMenu } = Menu;
const Admin = ({com}) => {
    const [theme,setTheme] = useState()
    const [visible, setVisible] = useState(false)
    const [imageURL, setImageURL] = useState('')
    const {API_URL} = useContext(context)
    const onThemeChagne = (value) =>{
        value?setTheme('dark'):setTheme('light')
    }
    const [form] = Form.useForm()
    const style = {
        background: 'rgba(0,0,0,0)',
        color: 'rgba(255, 99, 71, 0.5)',
        fontSize: '20px',
        marginTop: '0',
    }
    
    const onFinish = (value) =>{
        const form = new FormData()
        const {name} = value
        form.append("icon", imageURL, imageURL.name);
        form.append("name", name)
        axios.post(API_URL+"/cate/", form)
            .then(res=>{
             message.success('Add new category Success')
             setVisible(false)
        })
    }
    return (
        <div className=" admin d-flex">
                    <Modal title="Add new Category" visible={visible} footer={false} onCancel={()=>setVisible(false)}>
                        <Form
                            wrapperCol={{span: 24}}
                            labelCol={{span:24}}
                            onFinish={onFinish}
                            form={form}
                        >
                            <Form.Item
                                label="Category Name"
                                name="name"
                                rules={[{required: true, message:"Please input name"}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <input type="file" name="icon" onChange={(e) => setImageURL(e.target.files[0])}/>
                            </Form.Item>
                            <Form.Item>
                                <button className="btn-edit-food" type="submit">Submit</button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Menu
                        style={{ minHeight:'100vh', width:'20%'}}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1', 'sub2']}
                        mode="inline"
                        theme={theme}
                    >
                        <Menu.Item  style={style}>Dashboard </Menu.Item>
                        <SubMenu key="sub1" icon={<HomeOutlined />} title="Home">
                            <Menu.Item icon={<ContainerOutlined />} key="1"> <Link to="/admin">Product list</Link></Menu.Item>
                            <Menu.Item icon={<PlusOutlined />} key="2"> <Link to="/admin/add-product">Add new food</Link></Menu.Item>
                            <Menu.Item onClick={()=>setVisible(true)} icon={<PlusOutlined />} key="3">Add new category</Menu.Item>
                        </SubMenu>
                        <Menu.Item icon={<UserOutlined/>}>User Management</Menu.Item>
                        <SubMenu key="sub2" icon={<FileDoneOutlined />} title="Orders">
                            <Menu.Item icon={<ContainerOutlined />} key="5"><Link to="/admin/bill">List orders</Link></Menu.Item>
                            <Menu.Item icon={<BarChartOutlined/>} key="6"><Link to="/admin/chart">Chart</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Setting">
                            <Menu.Item key="10"> 
                                <Switch
                                    onChange={onThemeChagne}
                                    checkedChildren="Dark"
                                    unCheckedChildren="Light"
                                />
                            </Menu.Item>
                            <Menu.Item icon={<LockOutlined/>} key="11">Change password</Menu.Item>
                        </SubMenu>
                    </Menu>
                <div className="admin-component">
                    <div className="menu-admin">
                        <h4>Food App</h4>
                    </div>
                    <div className="container-fluid compo">
                        <div className="row">
                            <div className="col-12">
                                {com}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Admin