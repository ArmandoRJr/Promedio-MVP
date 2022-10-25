import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import theme from "../styles/theme"
import FormAddSemesterDialog from './FormAddSemesterDialog';
import FormEditDeleteSemesterDialog from './FormEditDeleteSemesterDialog';

const SidebarLink = styled(Link)`
    display:flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;

    &:hover {
        background: #252831;
        border-left: 4px solid #632ce4;
        cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled(Link)`
    background: #414757;
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    &:hover {
    background: #632ce4;
    cursor: pointer;
    }
`;

const AddCourse = styled(Link)`
    ${'' /* background: #414757; */}
    background-color: ${({theme}) => theme.colors.primary };
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    &:hover {
    background: #632ce4;
    cursor: pointer;
    }
`;

const AddSemester = styled(Link)`
    ${'' /* background: #414757; */}
    background-color: ${({theme}) => theme.colors.primary };
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    &:hover {
    background: #632ce4;
    cursor: pointer;
    }
`;

const EditDeleteCourse = styled(Link)`
    ${'' /* background: #414757; */}
    ${'' /* background-color: ${({theme}) => theme.colors.secondary }; */}
    background: #de5e68;
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    &:hover {
    background: #fe5c95;
    cursor: pointer;
    }
`;

const EditDeleteSemester = styled(Link)`
    ${'' /* background: #414757; */}
    ${'' /* background-color: ${({theme}) => theme.colors.secondary }; */}
    background: #de5e68;
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    &:hover {
    background: #fe5c95;
    cursor: pointer;
    }
`;

const SubMenu = ({item, addNewSemester, editSemester, deleteSemester, semesterData }) => {
    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)

    const handleAddCourse = () => {
        console.log("Add Course button clicked!");
        setIsOpenEditDeleteSemFDialog(true);
    }

    // *** ADD SEMESTER BUTTON STUFFS ***
    const [isOpenAddSemFDialog, setIsOpenAddSemFDialog] = useState(false);

    const handleAddSemester = () => {
        console.log("Add Semester button clicked!");
        setIsOpenAddSemFDialog(true);
    }

    const handleAddSemFDClickOpen = () => {
        setIsOpenAddSemFDialog(true);
      };
    
      const handleAddSemFDClose = () => {
        setIsOpenAddSemFDialog(false);
      };

    const handleAddSemFDAddSemester = (semesterName) => {
        // console.log(event)
        addNewSemester(semesterName);
        handleAddSemFDClose();
    };

    // *** ADD SEMESTER BUTTON STUFFS ***

    // *** EDIT/DELETE SEMESTER BUTTON STUFFS ***
    const [isOpenEditDeleteSemFDialog, setIsOpenEditDeleteSemFDialog] = useState(false);

    const handleEditDeleteSemester = () => {
        console.log("Edit/Delete Semester button clicked!");
        setIsOpenEditDeleteSemFDialog(true);
    }

    const handleEditDeleteSemFDClickOpen = () => {
        setIsOpenEditDeleteSemFDialog(true);
      };
    
      const handleEditDeleteSemFDClose = () => {
        setIsOpenEditDeleteSemFDialog(false);
      };

    const handleEditDeleteSemFDEditSemester = (oldSemesterName, newSemesterName) => {
        // console.log(event)
        //addNewSemester(semesterName);     // EDIT SEMESTER
        editSemester(oldSemesterName, newSemesterName)
        handleEditDeleteSemFDClose();
    };

    const handleEditDeleteSemFDDeleteSemester = (semesterName) => {
        // console.log(event)
        //addNewSemester(semesterName);     // DELETE SEMESTER
        deleteSemester(semesterName)
        handleEditDeleteSemFDClose();
    };
    // *** EDIT/DELETE SEMESTER BUTTON STUFFS ***

  return (
    <>
        {/* <SidebarLink to={item.path} onClick={item.subNav && showSubnav} > */}
        <FormAddSemesterDialog 
            open={isOpenAddSemFDialog}
            handleClose={handleAddSemFDClose}
            handleClickOpen={handleAddSemFDClickOpen}
            handleAddSemester={handleAddSemFDAddSemester}
        />
        <FormEditDeleteSemesterDialog
            open={isOpenEditDeleteSemFDialog}
            semesterData={semesterData}
            handleClose={handleEditDeleteSemFDClose}
            handleClickOpen={handleEditDeleteSemFDClickOpen}
            handleEditSemester={handleEditDeleteSemFDEditSemester}
            handleDeleteSemester={handleEditDeleteSemFDDeleteSemester}
        />
        <SidebarLink onClick={item.subNav && showSubnav} >
            <div>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
            </div>
            <div>
                {item.subNav && subnav 
                ? item.iconOpened 
                : item.subNav 
                ? item.iconClosed 
                : null}
            </div>
        </SidebarLink>
        {subnav && item.subNav.map((item, index, navArray) => {
            {/* console.log("penis", item, index, navArray); */}
            return (

                index === navArray.length - 1 ? (
                    item.title === "Edit/Delete Course" ? (
                        <EditDeleteCourse key={index} onClick={() => {}}> {/* <DropdownLink to={item.path} key={index}> */}
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </EditDeleteCourse>
                    ) : (
                        <EditDeleteSemester key={index} onClick={handleEditDeleteSemester}> {/* <DropdownLink to={item.path} key={index}> */}
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </EditDeleteSemester>
                    )
                ) : (
                index === navArray.length - 2 ? (
                    // Last item (for adding new course or semester)
                    item.title === "Add Course" ? (
                        <AddCourse key={index} onClick={() => {}}> {/* <DropdownLink to={item.path} key={index}> */}
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </AddCourse>
                    ) : (
                        <AddSemester key={index} onClick={handleAddSemester}> {/* <DropdownLink to={item.path} key={index}> */}
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </AddSemester>
                    )
                ) : (
                    <DropdownLink key={index}> {/* <DropdownLink to={item.path} key={index}> */}
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                ))
                
            );
        })}
    </>
  )
}

export default SubMenu
