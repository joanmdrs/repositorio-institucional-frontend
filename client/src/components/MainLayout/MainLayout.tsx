import React, { useState } from 'react';
import { Layout } from 'antd';
import MenuAdmin from '../MenuAdmin/MenuAdmin';
import ComponentHeader from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/auth.hook';
import { UserGroup } from '../../auth/groups';
import logoImage from '../../assets/logo.png';
import { BarsOutlined } from '@ant-design/icons';
const { Sider, Content } = Layout;

// const headerStyle: React.CSSProperties = {
//     textAlign: 'center',
//     color: '#fff',
//     height: 64,
//     lineHeight: '64px',
//     backgroundColor: '#4096ff',
// };

const contentStyle: React.CSSProperties = {
    minHeight: 120,
    lineHeight: '120px',
    backgroundColor: "#FFFFFF",
    padding: '10px'
};

const logoStyle: React.CSSProperties = {
    height: 64,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    fontFamily: "'Oleo Script', cursive",
};

const siderStyle: React.CSSProperties = {
    lineHeight: '120px',
    color: '#fff',
};

const layoutStyle: React.CSSProperties =  {
    overflow: 'hidden',
    minHeight: '100vh'
    // width: 'calc(50% - 8px)',
    // maxWidth: 'calc(50% - 8px)',
};

function MainLayout () {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAuth();


    function renderMenu() {
        if (!user) return null;

        if (user.groups.includes(UserGroup.ADMINISTRADOR)) {
            return <MenuAdmin />;
        }
        return null;
    }

    return (
        <Layout style={layoutStyle}>
            <Sider 
                style={siderStyle} 
                collapsible 
                collapsed={collapsed} 
                onCollapse={(value) => setCollapsed(value)}
            >
                <div style={logoStyle}>
                    
                    { !collapsed ? 
                        <img src={logoImage} alt="Logo" style={{width: `80%`, height: "auto", margin: '0'}} />
                        : <BarsOutlined />
                    }
                </div>
                {renderMenu()}
            </Sider>
            <Layout>
                <ComponentHeader />
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}


export default MainLayout;