import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    returnToChatbot = () => {
        if (this.props.history) {
            this.props.history.push(`/chatbot`)
        }
    }

    render() {
        let language = this.props.language
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars" onClick={() => this.returnToHome()}></i>
                            <div className='header-logo' onClick={() => this.returnToHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.specialty" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.find-doctor-specialty" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.health-facility" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.select-clinic" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.doctor" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.selecy-doctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.fee" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-comment-dots" onClick={() => this.returnToChatbot()}></i>
                                <FormattedMessage id="home-header.chatbot" />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>

                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='banner-tag'><FormattedMessage id="banner.banner-tag" /></div>
                            <div className='banner-title'><FormattedMessage id="banner.banner-title" /></div>
                            <div className='banner-search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm kiếm chuyên khoa' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='banner-options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.text-child-1" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.text-child-2" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-stethoscope"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.text-child-3" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-vial"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.text-child-4" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.text-child-5" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.text-child-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {/* <div className='distance-between'></div> */}
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
