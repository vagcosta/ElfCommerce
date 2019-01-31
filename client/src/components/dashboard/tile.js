import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
} from 'reactstrap';

const Tile = props => {
  const { tileStyle, titleStyle, textStyle, title, description } = props;
  return (
    <Card body style={tileStyle || {}}>
      <CardTitle style={titleStyle || {}}>
        {title}
      </CardTitle>
      <div style={textStyle || {}}>{description || ''}</div>
    </Card>
  );
};

Tile.propTypes = {
  title: PropTypes.string.isRequired,
  tileStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  textStyle: PropTypes.object,
  description: PropTypes.object,
};

export default Tile;
