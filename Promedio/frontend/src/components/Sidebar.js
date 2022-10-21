import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

import SubMenu from './SubMenu';
import { SidebarDataNew } from './SidebarDataNew';
import { IconContext } from 'react-icons/lib';
import { get, patch, post } from '../api/index';
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

const Button = styled.div`
    width: 20%;
`

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const [semesters, setSemesters] = useState([]);

    const getSemesters = () => {
        const user = JSON.parse(localStorage.getItem('authUser'))

        const getCourses = (semesterData) => {
            get(`/user/${user._id}/semester/${semesterData.name}/course`).then((response) => {
                const courseSidebarData = response.data.map((courseData) =>{
                    return {
                        title: courseData.name,
                        path: `home/semester/${semesterData.name}/course/${courseData.name}/`,
                        icon: <IoIcons.IoIosDocument />
                    }
                })
    
                return courseSidebarData
                }
              ).catch((error) => {
                console.log(error);
              });
        }

        get(`/user/${user._id}/semester`).then((response) => {

            const semesterSidebarData = response.data.map((semesterData) =>{
                const subNav = getCourses(semesterData)
                console.log(`subNav`, subNav)
                return {
                    title: semesterData.name,
                    path: `home/semester/${semesterData.name}`,
                    icon: <FaIcons.FaFolder />,
                    iconClosed: <RiIcons.RiArrowDownSFill />,
                    iconOpened: <RiIcons.RiArrowUpSFill />,
                    subNav: subNav
                }
            })

            setSemesters(semesterSidebarData);
            }
          ).catch((error) => {
            console.log(error);
          });
    }


    return (
        <>
            <IconContext.Provider value={{ color: `${theme.colors.primary_light }` }}>
                <Button onClick={getSemesters}>Press me!</Button>
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
                        {semesters.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;