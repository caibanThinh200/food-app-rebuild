import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import '../../style/admin.css'
const { SubMenu } = Menu;
const Admin = ({com}) => {
    return (
        <div className=" admin d-flex">
                    <Menu
                        style={{ minHeight:'100vh', width:'20%'}}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                    >
                        <SubMenu key="sub1" icon={<MailOutlined />} title="Home">
                            <Menu.Item key="1">Product list</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                <div className="admin-component">
                    <div className="menu-admin">
                        <h4>Dashboard</h4>
                    </div>
                    <div className="container-fluid compo">
                        <div className="row">
                            {com}
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Admin