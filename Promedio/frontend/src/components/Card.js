import React from 'react'
import styled from "styled-components";

const CardContainer = styled.div`
    color: ${({ theme }) => theme.colors.black};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20rem;
    height: 25rem;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s box-shadow ease-in;
    &:hover {
        box-shadow: 0 0 10px 0 ${({ theme }) => theme.colors.black};
    }
    padding: 5px;
    cursor: default;
`;

const CardHeader = styled.div`
    flex: 0.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 8px;
`;

const CardImageContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 100%;
    width: 6rem;
    height: 6rem;
`;

const CardImage = styled.img``;

const CardTitle = styled.h3``;

const CardBody = styled.div`
    flex: 0.5;
    font-family: ${({ theme }) => theme.fonts.secondary};
    padding: 15px;
    text-align: center;
`;

export const Card = ({ title, desc }) => {
  return (
    <CardContainer>
        <CardHeader>
            <CardImageContainer>
                <CardImage />
            </CardImageContainer>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardBody>{desc}</CardBody>
    </CardContainer>
  )
}
