import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import FormAddSemesterDialog from './FormAddSemesterDialog';
import FormEditDeleteSemesterDialog from './FormEditDeleteSemesterDialog';
import FormCourseDialog from './FormCourseDialog';

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
    const [subnav, setSubnav] = useState(false);
    // TODO: Add the ability to select a course you want to delete
    const [selectedCourseId, setSelectedCourseId] = useState(undefined);

    const showSubnav = () => setSubnav(!subnav)

    const [isOpenAddSemFDialog, setIsOpenAddSemFDialog] = useState(false);

    const handleAddSemester = () => {
        setIsOpenAddSemFDialog(true);
    }

    const handleAddSemFDClickOpen = () => {
        setIsOpenAddSemFDialog(true);
      };

      const handleAddSemFDClose = () => {
        setIsOpenAddSemFDialog(false);
      };

    const handleAddSemFDAddSemester = (semesterName) => {
        addNewSemester(semesterName);
        handleAddSemFDClose();
    };

    const [isOpenAddCourseFDialog, setIsOpenAddCourseFDialog] = useState(false);

    const handleAddCourse = () => {
        setIsOpenAddCourseFDialog(true);
    }

    const handleAddCourseFDClose = () => {
    setIsOpenAddCourseFDialog(false);
    };

    const [isOpenEditDeleteSemFDialog, setIsOpenEditDeleteSemFDialog] = useState(false);

    const handleEditDeleteSemester = () => {
        setIsOpenEditDeleteSemFDialog(true);
    }

    const handleEditDeleteSemFDClickOpen = () => {
        setIsOpenEditDeleteSemFDialog(true);
      };

      const handleEditDeleteSemFDClose = () => {
        setIsOpenEditDeleteSemFDialog(false);
      };

    const handleEditDeleteSemFDEditSemester = (semesterId, newSemesterName) => {
        editSemester(semesterId, newSemesterName)
        handleEditDeleteSemFDClose();
    };

    const handleEditDeleteSemFDDeleteSemester = (semesterId) => {
        deleteSemester(semesterId)
        handleEditDeleteSemFDClose();
    };
  return (
    <>
        <FormAddSemesterDialog
            open={isOpenAddSemFDialog}
            handleClose={handleAddSemFDClose}
            handleClickOpen={handleAddSemFDClickOpen}
            handleAddSemester={handleAddSemFDAddSemester}
        />
        <FormCourseDialog
            open={isOpenAddCourseFDialog}
            id={selectedCourseId}
            handleClose={handleAddCourseFDClose}
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
            return (

                index === navArray.length - 1 ? (
                    item.title === "Edit/Delete Course" ? (
                        <EditDeleteCourse key={index} onClick={handleAddCourse}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </EditDeleteCourse>
                    ) : (
                        <EditDeleteSemester key={index} onClick={handleEditDeleteSemester}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </EditDeleteSemester>
                    )
                ) : (
                index === navArray.length - 2 ? (
                    item.title === "Add Course" ? (
                        <AddCourse key={index} onClick={handleAddCourse}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </AddCourse>
                    ) : (
                        <AddSemester key={index} onClick={handleAddSemester}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </AddSemester>
                    )
                ) : (
                    <DropdownLink key={index}>
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
