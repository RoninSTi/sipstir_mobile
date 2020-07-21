import React from 'react';

import { useSelector } from 'react-redux'

import { Text } from 'react-native';

const AlltimeLeaderboardPosition = ({ textStyle }) => {
  const { allTimeLeaderboardPosition: position } = useSelector(state => state.user)

  const positionText = () => {
    if (position === 0) return 'Last';

    const lastDigit = position
      .toString()
      .split('')
      .pop();

    switch (lastDigit) {
      case '1':
        return `${position}st`;
      case '2':
        return `${position}nd`;
      case '3':
        return `${position}rd`;
      default:
        return `${position}th`;
    }
  };

  return <Text style={textStyle}>{positionText()}</Text>;
};

AlltimeLeaderboardPosition.defaultProps = {
  textStyle: {},
};

AlltimeLeaderboardPosition.propTypes = {
  textStyle: Text.propTypes.style,
};

export default AlltimeLeaderboardPosition;
