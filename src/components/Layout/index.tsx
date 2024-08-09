import React from 'react';
import {Flex, Layout, Menu} from 'antd'
import Header from "../Header";
const { Sider, Content } = Layout;

const layoutStyle = {
  overflow: 'hidden',
  height: "100vh"
};

const AppLayout = (props:{
  children:React.JSX.Element
}) =>{
  return <Layout style={layoutStyle}>
    <Header></Header>
    <Layout>
      <Sider>
        <Menu>
          <Menu.Item>预约</Menu.Item>
        </Menu>
      </Sider>
      <Content>
        {
          props.children
        }
      </Content>
    </Layout>
  </Layout>
}

export default AppLayout
