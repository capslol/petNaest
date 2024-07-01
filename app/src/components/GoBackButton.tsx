import React from 'react';
import styled from "styled-components";
import {colors, fonts, mixins} from '../styles/styles';
import { IoChevronBackOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom";


const StyledGoBackButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${colors.lightGray};
  cursor: pointer;
`;


const GoBackButton = () => {
    const navigate = useNavigate()
    return (
        <StyledGoBackButton onClick={() => navigate(-1)} aria-label="Go back">
            <IoChevronBackOutline />

        </StyledGoBackButton>
    );
};

export default GoBackButton;