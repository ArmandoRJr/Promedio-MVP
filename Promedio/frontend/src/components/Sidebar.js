import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";

import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { get, patch, post, del} from '../api/index';
import theme from "../styles/theme"



const Nav = styled.div`
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

const SidebarNav = styled.nav`
    background: #15171c;
    width: 250px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    position: absolute;
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

    const [semesters, setSemesters] = useState([]);
    const [sidebarData, setSidebarData] = useState([]);

    const getSemesters = () => {
        const user = JSON.parse(localStorage.getItem('authUser'))

        get(`/user/${user._id}/semester`).then((response) => {
            setSemesters(response.data);
            makeSidebarData(response.data);
        }
          ).catch((error) => {
            console.log(error);
          });
    }

    const makeSidebarData = (semesters) => {
        const semesterSidebarData = semesters.map((semesterData) =>{
            const subNav = [
                {
                    title: "Add Course",
                    path: `/home/${semesterData.name}/add`,
                    icon: <AiIcons.AiFillFileAdd />
                },
                {
                    title: "Edit/Delete Course",
                    path: `/home/${semesterData.name}/editDelete`,
                    icon: <AiIcons.AiTwotoneEdit />
                },
            ];
            return {
                title: semesterData.name,
                path: `home/semester/${semesterData.name}`,
                icon: <FaIcons.FaFolder />,
                iconClosed: <RiIcons.RiArrowDownSFill />,
                iconOpened: <RiIcons.RiArrowUpSFill />,
                subNav: subNav
            }
        })

        setSidebarData(
            [
                {
                    title: "University of Toronto",
                    path: "/home",
                    icon: <FaIcons.FaUniversity />,
                    iconClosed: <RiIcons.RiArrowDownSFill />,
                    iconOpened: <RiIcons.RiArrowUpSFill />,
                    subNav: [
                        {
                            title: "Add Semester",
                            path: "/home/add",
                            icon: <AiIcons.AiFillFolderAdd />,
                        },
                        {
                            title: "Edit/Delete Semester",
                            path: "/home/editDelete",
                            icon: <AiIcons.AiTwotoneEdit />,
                        }
                    ]
                },
                ...semesterSidebarData
            ]);
    }


    const addSemester = (semesterName) => {
        const user = JSON.parse(localStorage.getItem('authUser'));

        post(`/user/${user._id}/semester`, {semesterName: semesterName})
            .then((res) => {
                setSemesters([
                    ...semesters,
                    res.data.semester
                ])
                const semesterData = res.data.semester;

                // IDEALLY SHOULD REPOPULATE GIVEN SEMESTERS BUT WE'LL ALLOW
                // REUSING CODE
                const subNav = [
                    {
                        title: "Add Course",
                        icon: <AiIcons.AiFillFileAdd />
                    },
                    {
                        name: "Edit/Delete Course",
                        icon: <AiIcons.AiTwotoneEdit />
                    },
                ];
                setSidebarData([
                    ...sidebarData,
                    {
                        title: semesterData.name,
                        path: `home/semester/${semesterData.name}`,
                        icon: <FaIcons.FaFolder />,
                        iconClosed: <RiIcons.RiArrowDownSFill />,
                        iconOpened: <RiIcons.RiArrowUpSFill />,
                        subNav: subNav
                    }
                ]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const editSemester = (oldSemesterName, newSemesterName) => {
        const user = JSON.parse(localStorage.getItem('authUser'));

        patch(`/user/${user._id}/semester/${oldSemesterName}`, {semesterName: newSemesterName})
            .then((res) => {
                setSemesters(semesters.map((semester) => {
                    if (semester.name === oldSemesterName) {
                        return {
                            ...semester,
                            name: newSemesterName
                        }
                    }
                    else return semester;
                }))

                setSidebarData(sidebarData.map((sidebarData) => {
                    if (sidebarData.title === oldSemesterName) return {
                        ...sidebarData,
                        title: newSemesterName,
                    }
                    else return sidebarData
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteSemester = (semesterName) => {
        const user = JSON.parse(localStorage.getItem('authUser'));

        del(`/user/${user._id}/semester/${semesterName}`)
            .then((res) => {
                const semestersToSet = semesters.filter(semester =>
                    semester.name !== semesterName)
                setSemesters(semestersToSet)
                const sidebarDataToSet = sidebarData.filter(siderbarData =>
                    siderbarData.title !== semesterName)
                setSidebarData(sidebarDataToSet)


            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getSemesters();
    }, []);

    return (
        <>
            <IconContext.Provider value={{ color: `${theme.colors.primary_light }` }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                </Nav>
                <SidebarNav sidebar={sidebar} >
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {sidebarData.map((item, index) => {
                            return <SubMenu
                                item={item}
                                key={index}
                                addNewSemester={addSemester}
                                editSemester={editSemester}
                                deleteSemester={deleteSemester}
                                semesterData={semesters}
                            />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;