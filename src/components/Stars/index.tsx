import React from 'react';
import StarFull from '../../assets/star.svg';
import StarHalf from '../../assets/star_half.svg';
import StarEmpty from '../../assets/star_empty.svg';
import {StarArea, StarText, StarView} from './styles';

interface StarsProps {
  stars: number;
  showNumber: boolean;
}

export default function Stars({stars, showNumber}: StarsProps) {
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
        <StarView key={k}>
          {i === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
          {i === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
          {i === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </StarArea>
  );
}
