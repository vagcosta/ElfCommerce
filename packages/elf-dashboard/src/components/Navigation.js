import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  NavLink,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Container,
  Badge,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { MdNotificationsNone } from 'react-icons/md';
import jwt from 'jsonwebtoken';
import config from '../config';

const Navigation = props => {
  const [account, setAccount] = useState(null);

  if (
    window.location.pathname !== '/' &&
    !localStorage.getItem(config.accessTokenKey)
  ) {
    window.location.href = '/';
  }

  useEffect(() => {
    async function fetchAccount() {
      try {
        const {
          data: { storeId, accountId },
        } = jwt.decode(localStorage.getItem(config.accessTokenKey));

        const res = await axios.get(
          `${config.apiDomain}/stores/${storeId}/accounts/${accountId}`,
          {
            headers: {
              authorization: localStorage.getItem(config.accessTokenKey),
            },
          }
        );
        setAccount(res.data);
      } catch (e) {
        window.location.href = '/';
      }
    }

    fetchAccount();
  }, []);

  return (
    <div className="admin-navbar">
      <Container fluid>
        <Navbar light expand="md">
          <Nav className="ml-auto">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <MdNotificationsNone size={20} />
                <Badge color="danger">1</Badge>
              </DropdownToggle>
              <DropdownMenu style={{ marginLeft: -100, width: 280 }}>
                <DropdownItem>
                  <NavLink href="#" style={{ whiteSpace: 'normal' }}>
                    <b>A new product has been created.</b>
                    <br />
                    <span className="text-muted">
                      Your collegue John Doe has created a new product:
                      sdlfladsjf
                    </span>
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="#">
                    <b>A new product has been created.</b>
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {account ? account.name : ''}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href="/settings">
                    <FormattedMessage id="sys.myAccount" />
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/">
                    <FormattedMessage id="sys.logout" />
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};

export default Navigation;
