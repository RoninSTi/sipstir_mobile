import React from 'react';
import PropTypes from 'prop-types';

import { ViewPropTypes } from 'react-native';
import { Avatar } from 'react-native-paper';

const BSAvatar = ({ user, containerStyle }) => {
  const { avatar, username } = user;

  if (!username) return null;

  return avatar ? (
    <Avatar.Image size={45} source={{ uri: avatar }} style={containerStyle}/>
  ) : (
      <Avatar.Text size={45} label={username[0]} style={containerStyle} />
    );
};

BSAvatar.defaultProps = {
  containerStyle: {},
};

BSAvatar.propTypes = {
  containerStyle: ViewPropTypes.style,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

export default BSAvatar;
