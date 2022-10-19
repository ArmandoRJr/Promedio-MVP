import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SubMenu from './SubMenu';
import { SidebarDataNew } from './SidebarDataNew';
import { IconContext } from 'react-icons/lib';
import theme from "../styles/theme"

const Nav = styled.div`
    ${'' /* background: #15171c; */}
    background-color: ${({theme}) => theme.colors.primary };
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavTitle = styled(Link)`
    margin-left: 2rem;
    margin-right: 2rem;
    ${'' /* font-size: 2rem; */}
    flow-direction: row;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #15171c;
    ${'' /* background-color: ${({theme}) => theme.colors.primary }; */}
    width: 250px;
    height: calc(100% - 60px);
    display: flex;
    justify-content: flex-start;
    position: fixed;
    top: 60px;
    overflow-y: scroll;
    bottom: 0;
    box-sizing: border-box;
    left: ${({ sidebar }) => (sidebar ? '0%' : '-100%')};
    transition: 350ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: `${theme.colors.primary_light }` }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                    {/* <a href={"https://utsc.calendar.utoronto.ca/course/csca08h3"} target={"_blank"}>CSCA08</a> */}
                </Nav>
                <SidebarNav sidebar={sidebar} >
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {SidebarDataNew.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;