import React from "react";
import styled from "styled-components";
import StarFull from "../assets/star.svg";
import StarHalf from "../assets/star_half.svg";
import StarEmpty from "../assets/star_empty.svg";

const StarArea = styled.View`
    flex-direction: row;
`;

const StarView = styled.View``;

const StarText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px; 
    color: #737373;
`;

export default function Stars({ stars, showNumber }) {

    let s = [0, 0, 0, 0, 0];
    let integers = Math.floor(stars);
    let decimals = stars - integers;

    for (var i = 0; i < integers; i++) {
        s[i] = 2;
    }

    if (decimals > 0) {
        s[i] = 1;
    }

    return (
        <StarArea>
            {s.map((i, k) => (
                <StarView key={k} >
                    {i === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
                    {i === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
                    {i === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
                </StarView>
            ))}
            { showNumber && <StarText>{stars}</StarText>}
        </StarArea >
    );
}