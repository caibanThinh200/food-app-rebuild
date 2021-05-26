import { Menu, Switch } from 'antd';
import { HomeOutlined, SettingOutlined, FileDoneOutlined } from '@ant-design/icons';
import '../../style/admin.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
const { SubMenu } = Menu;
const Admin = ({com}) => {
    const [theme,setTheme] = useState()
    const onThemeChagne = (value) =>{
        value?setTheme('dark'):setTheme('light')
    }
    return (
        <div className=" admin d-flex">
                    <Menu
                        style={{ minHeight:'100vh', width:'20%'}}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme={theme}
                    >
                        <SubMenu key="sub1" icon={<HomeOutlined />} title="Home">
                            <Menu.Item key="1"> <Link to="/admin">Product list</Link></Menu.Item>
                            <Menu.Item key="2"> <Link to="/admin/add-product">Add new food</Link></Menu.Item>
                            <Menu.Item key="3">Add new category</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<FileDoneOutlined />} title="Orders">
                            <Menu.Item key="5">List orders</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Setting">
                            <Menu.Item key="10"> <Switch
                                onChange={onThemeChagne}
                                checkedChildren="Dark"
                                unCheckedChildren="Light"
                            /> </Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
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