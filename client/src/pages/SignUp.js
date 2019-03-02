import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Modal size="sm" isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>
          <FormattedMessage id="sys.register" />
        </ModalHeader>
        <ModalBody>
          <Form horizontal>
            <FormGroup controlId="formHorizontalFirstName">
              <Input
                type="text"
                placeholder={formatMessage({ id: 'sys.fName' })}
              />
            </FormGroup>
            <FormGroup controlId="formHorizontalLastName">
              <Input
                type="text"
                placeholder={formatMessage({ id: 'sys.lName' })}
              />
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
              <Input
                type="email"
                placeholder={formatMessage({ id: 'sys.email' })}
              />
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Input
                type="password"
                placeholder={formatMessage({ id: 'sys.pwd' })}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" className="float-right" block>
                <FormattedMessage id="sys.register" />
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  null
)(injectIntl(SignUp));
