// react styled component functional component of a navbar

import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';


const NavbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: ${({ theme }) => theme.colors.white};
    height: 60px;
    width: 100%;
    z-index: 100;
`;

const NavbarLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex: 2;
`;

const NavbarRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex: 2;
    height: 100%;
`;

const NavbarLink = styled(Link)`
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
    font-size: 1.2rem;
    margin: 0 10px;
    &:hover {
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

const Logo = styled.img`
    height: 25px;
    width: 25px;
`;

const MainLink = styled(NavbarLink)`
    font-size: 1.5rem;
    font-weight: bold;
`;

const Logout = styled.div`
    color: red;
    font-size: 1.2rem;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: red;
        color: white;
    }
    width: 90px;
`;

export const Navbar = ({ authUser, logout }) => {
    return (
        <NavbarContainer>
            <NavbarLeft>
                <Logo src="logo.png" />
                <MainLink to="/">Promedio.</MainLink>
            </NavbarLeft>
            <NavbarRight>
                {!!authUser ? (
                    <>
                        <NavbarLink to="/gpa">GPA</NavbarLink>
                        <NavbarLink to="/courses">All Courses</NavbarLink>
                        <NavbarLink to="/semesters">Semesters</NavbarLink>
                        <NavbarLink to="/user">Profile</NavbarLink>
                        <Logout onClick={logout}>Logout</Logout>
                    </>
                ) : (
                    <>
                        <NavbarLink to="/login">Login</NavbarLink>
                        <NavbarLink to="/signup">Signup</NavbarLink>
                    </>
                )}
            </NavbarRight>
        </NavbarContainer>
    );
}
