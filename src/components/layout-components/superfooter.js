import React, { Component } from 'react';
import ContactUs from '../ContactUs';
import PrivacyPolicy from '../terms/PrivacyPolicy';
import TermsAndConditions from '../terms/TermsAndConditions';
import RefundPolicy from '../terms/RefundPolicies';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  // justify-content: flex-start;
  padding: 10px;
`;

const Sidebar = styled.div`
  width: ${(props) => (props.isSmallScreen ? '100%' : '250px')}; /* Dynamic width based on isSmallScreen prop */
  padding: 50px;
  // overflow-y: auto;

  
  @media (max-width: 768px) {
    /* Set the width to 100% on smaller screens */
    width: 100%;
  }
`;

const NavbarHeading = styled.h2`
  font-size: 1.5rem;
  margin-top: 50px;
  cursor: pointer;
  &:hover, &:visited{
    text-decoration: underline;
    // background-color: blue;
  }
`;

const ContentColumn = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin-top: 50px;
  padding: 5px;
  font-size: 30px;
`;

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSmallScreen: false, // Initially, the screen is not small
      selectedSection: 'terms',
    };
  }

  componentDidMount() {
    // Check the screen size on component mount
    this.checkScreenSize();
    // Add a resize event listener to update the screen size
    window.addEventListener('resize', this.checkScreenSize);
  }

  componentWillUnmount() {
    // Remove the resize event listener when the component is unmounted
    window.removeEventListener('resize', this.checkScreenSize);
  }

  // Function to check the screen size and update the state
  checkScreenSize = () => {
    this.setState({ isSmallScreen: window.innerWidth <= 768 });
  };

  // Function to handle link clicks and update the selected section
  handleSectionChange = (section) => {
    this.setState({ selectedSection: section });
  };

  render() {
    return (
      <FooterContainer>
        {/* Sidebar */}
        <Sidebar isSmallScreen={this.state.isSmallScreen}>
          <NavbarHeading onClick={() => this.handleSectionChange('terms')}>
            Terms and Conditions
          </NavbarHeading>
          <NavbarHeading onClick={() => this.handleSectionChange('privacy')}>
            Privacy Policies
          </NavbarHeading>
          <NavbarHeading onClick={() => this.handleSectionChange('refund')}>
            Refund Policies
          </NavbarHeading>
          <NavbarHeading onClick={() => this.handleSectionChange('contact')}>
            Contact Us
          </NavbarHeading>
        </Sidebar>
        {/* Content Column */}
        <ContentColumn>
          {/* Render content based on the selected section */}
          {this.state.selectedSection === 'terms' && <TermsAndConditions />}
          {this.state.selectedSection === 'privacy' && <PrivacyPolicy />}
          {this.state.selectedSection === 'refund' && <RefundPolicy />}
          {this.state.selectedSection === 'contact' && <ContactUs />}
        </ContentColumn>
      </FooterContainer>
    );
  }
}

export default Footer;
