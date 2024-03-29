import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import PropTypes from "prop-types";

import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/brand/favicon4.png";
import sygnet from "../../assets/img/brand/sygnet.svg";
const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radioSelected: 0
    };
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/charts" className="nav-link">
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/stateDetail" className="nav-link">
              State Details
            </Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/stateComparison" className="nav-link">
              States Comparison
            </NavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar />
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
