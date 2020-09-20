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

            {matches.matches.data.map(m => <div key={`${m.team1}${m.team1}`}>
                {m.team1} - {m.team2} <br />
                {m.Odd.one} {m.Odd.x} {m.Odd.two} 
            </div>)}
        </StyledViewMatches>
    )
}

const mapStateToProps = ({ matches }) => {
    console.log(matches)
    const m = {
        isFetching: matches.isFetching,
        matches: matches
    }
    return m;
};

export default connect(mapStateToProps, { getMatches })(ViewMatches);
