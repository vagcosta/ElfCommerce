import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
} from 'reactstrap';

const FeedItem = props => {
  const { backgroundColor, fontColor, title, content, datetime } = props;
  return (
    <Card body style={{ marginTop: 10, background: backgroundColor || '#fff' }}>
      <CardTitle style={{ color: fontColor || '#000', fontWeight: 200 }}>
        {title}
      </CardTitle>
      <div className="text-muted">{datetime}</div>
      <div className="text-muted">{content}</div>
    </Card>
  );
};

FeedItem.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
};

export default FeedItem;
