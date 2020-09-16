import React, {useEffect} from "react";
//import {Link} from "react-router-dom"
import {connect} from "react-redux";
import styled from "styled-components";
import {getMatches} from "../actions"

export const StyledViewMatches = styled.div`
    background-color: coral;
    h2 {
        margin-bottom: 1rem;
    }
`;

const ViewMatches = ({isFetching, getMatches}) => {
    useEffect(()=>{
        getMatches();
    },[])

    return (
        <StyledViewMatches>
            <h2>View Matches</h2>
        </StyledViewMatches>
    )
}


const mapStateToProps = ({ matches }) => ({
    isFetching: matches.isFetching,
    matches: matches.matches,
});

export default connect(mapStateToProps, { getMatches })(ViewMatches);
