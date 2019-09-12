import React from "react";
import Styled from "styled-components";

const StyledContainer = Styled.div`
background: rgb(229, 245, 250, 0.7);
border-radius: 6px;
grid-area: ${props => props.gridArea};
height: auto;
width: auto;
padding: 2vh;
`;

const Container = props => {
  return <StyledContainer gridArea={props.gridArea}></StyledContainer>;
};

export default Container;
