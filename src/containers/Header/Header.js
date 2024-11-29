import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
            isNavigatorVisible: false, // Trạng thái ẩn/hiện navigator
        };
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({ menuApp: menu });
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    handleToggleNavigator = () => {
        this.setState((prevState) => ({
            isNavigatorVisible: !prevState.isNavigatorVisible,
        }));
    };

    // Hàm này sẽ đóng navigator khi một menu được chọn
    handleMenuItemClick = () => {
        this.setState({ isNavigatorVisible: false });
    };

    render() {
        const { processLogout, language, userInfo } = this.props;
        const { isNavigatorVisible, menuApp } = this.state;

        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <div
                        className="hamburger-icon"
                        onClick={this.handleToggleNavigator}
                        title="Menu"
                    >
                        <i className="fas fa-bars"></i>
                    </div>

                    <div className={`header-info ${isNavigatorVisible ? 'hidden' : ''}`}>
                        <span className="welcome">
                            <FormattedMessage id="home-header.welcome" />, {userInfo?.firstName || ""}
                        </span>
                        <span
                            className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                        >
                            VN
                        </span>
                        <span
                            className={language === LANGUAGES.EN ? "language-en active" : "language-en"}
                            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                        >
                            EN
                        </span>
                        <div
                            className="btn btn-logout"
                            onClick={processLogout}
                            title="Log out"
                        >
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>

                    <div className={`navigator-wrapper ${isNavigatorVisible ? "visible" : ""}`}>
                        {isNavigatorVisible && <Navigator menus={menuApp} onMenuItemClick={this.handleMenuItemClick} />}
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
