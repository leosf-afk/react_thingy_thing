import React, {useEffect} from "react";
//import {Link} from "react-router-dom"
import {connect} from "react-redux";
import styled from "styled-components";
import {getMatches} from "../actions"
import match from "../reducers/match";

export const StyledViewMatches = styled.div`
    background-color: coral;
    h2 {
        margin-bottom: 1rem;
    }
`;

const ViewMatches = ({isFetching, matches, getMatches}) => {
    useEffect(()=>{
        getMatches()
    },[getMatches])

    if (isFetching) {
        return "Waiting";
    }

    console.log(matches)
    return (
        <StyledViewMatches>
            <h2>View Matches</h2>

            {matches.matches.map(m => <div key={`${m.Equipo1}${m.Equipo1}`}>{m.Equipo1} - {m.Equipo2}</div>)}
        </StyledViewMatches>
    )
}



const mapStateToProps = ({ match }) => ({
    isFetching: match.isFetching,
    matches: match,
});

export default connect(mapStateToProps, { getMatches })(ViewMatches);
