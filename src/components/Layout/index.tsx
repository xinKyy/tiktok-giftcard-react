import React, {useEffect, useState} from 'react';
import {Flex, Layout, Menu} from 'antd'
import Header from "../Header";
import styles from "./index.module.scss"
const { Sider, Content } = Layout;

const layoutStyle = {
  height: "100vh",
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
      backgroundColor:"#000"
    }}>
      <Sider className={"mobile_none"} style={{
        backgroundColor:"#111010",
      }}>
        <div className={styles.active_menu} key={"1"}>
          <svg width="32" data-e2e="" height="32" viewBox="0 0 48 48" fill="rgba(254, 44, 85, 1)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.9505 7.84001C24.3975 7.38666 23.6014 7.38666 23.0485 7.84003L6.94846 21.04C6.45839 21.4418 6.2737 22.1083 6.48706 22.705C6.70041 23.3017 7.26576 23.7 7.89949 23.7H10.2311L11.4232 36.7278C11.5409 38.0149 12.6203 39 13.9128 39H21.5C22.0523 39 22.5 38.5523 22.5 38V28.3153C22.5 27.763 22.9477 27.3153 23.5 27.3153H24.5C25.0523 27.3153 25.5 27.763 25.5 28.3153V38C25.5 38.5523 25.9477 39 26.5 39H34.0874C35.3798 39 36.4592 38.0149 36.577 36.7278L37.7691 23.7H40.1001C40.7338 23.7 41.2992 23.3017 41.5125 22.705C41.7259 22.1082 41.5412 21.4418 41.0511 21.04L24.9505 7.84001Z"></path></svg>
            予約購入</div>
      </Sider>
      <Content style={{
        height:"100%",
        backgroundColor:"#111010",
        overflow:"scroll",
      }}>
        {
          props.children
        }
      </Content>
    </Layout>
  </Layout>
}

export default AppLayout
