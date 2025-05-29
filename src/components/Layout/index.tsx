import React, {useEffect, useState} from 'react';
import {Flex, Layout, Menu} from 'antd'
import Header from "../Header";
import styles from "./index.module.scss"
const { Sider, Content } = Layout;

const layoutStyle = {
  minHeight: "100vh",
  backgroundColor:"#000"
};

const AppLayout = (props:{
  children:React.JSX.Element
}) =>{
  return <Layout style={layoutStyle}>
    <Header></Header>
    <Layout style={{
      paddingTop:"60px",
      display:"flex",
      justifyContent:"center",
      backgroundColor:"#111010",
    }}>
      <Content className={"min-w-1200"} style={{
        height:"100%",
        backgroundColor:"#111010",
      }}>
        {
          props.children
        }
      </Content>
    </Layout>
  </Layout>
}

export default AppLayout
