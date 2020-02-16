import React from 'react';
import { Container } from 'reactstrap';

const Footer = () => (
  <Container id="footer">
    <div className="text-center copyright">
      <span>Copyright &copy; 2018</span>
      &nbsp;&nbsp;
      <span>
        Created by:&nbsp;
        <a href="https://github.com/ccwukong">Nick Chen</a>
      </span>
    </div>
  </Container>
);

export default Footer;
