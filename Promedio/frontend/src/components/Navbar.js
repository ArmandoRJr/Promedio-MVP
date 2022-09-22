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
`;

const NavbarLink = styled(Link)`
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
    font-size: 1.2rem;
    margin: 0 10px;
    &:hover {
        color: ${({ theme }) => theme.colors.tertiary};
    }
`;

const MainLink = styled(NavbarLink)`
    font-size: 1.5rem;
    font-weight: bold;
    &:hover {
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const Navbar = ({ isLoggedIn }) => {
    return (
        <NavbarContainer>
            <NavbarLeft>
                <MainLink to="/">Promedio.</MainLink>
            </NavbarLeft>
            <NavbarRight>
                {isLoggedIn ? (
                    <div>Welcome</div>
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
