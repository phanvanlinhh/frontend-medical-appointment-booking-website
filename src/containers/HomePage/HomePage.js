import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility'
import OutstandingDoctor from './Section/OutstandingDoctor';
import Handbook from './Section/Handbook';
import HomeFooter from './HomeFooter';
import './HomePage.scss'
import "react-multi-carousel/lib/styles.css";

class HomePage extends Component {

    render() {
        let responsive = {
            superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 }, items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 }, items: 3
            },
            tablet: {
                breakpoint: { max: 1024, min: 550 }, items: 2
            },
            mobile: {
                breakpoint: { max: 500, min: 0 }, items: 1
            }
        };
        return (
            <div >
                <HomeHeader isShowBanner={true} />
                <Specialty responsive={responsive} />
                <MedicalFacility />
                <OutstandingDoctor responsive={responsive} />
                <Handbook responsive={responsive} />
                <HomeFooter />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
