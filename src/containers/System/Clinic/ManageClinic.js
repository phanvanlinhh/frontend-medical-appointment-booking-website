import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { createClinic, updateClinic } from '../../../services/userService'
import TableClinic from './TableClinic';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewClinic = async () => {
        let res = await createClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new clinic succeed!')
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        }
        else {
            toast.error('Something wrong...')
        }
    }
    handleEditClinic = (clinic) => {
        this.setState({
            id: clinic.id,
            name: clinic.name,
            address: clinic.address,
            imageBase64: clinic.image,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
        });
    }
    handleSaveClinic = async () => {
        let { id, name, address, imageBase64, descriptionHTML, descriptionMarkdown } = this.state;
        if (!name || !address || !descriptionHTML || !descriptionMarkdown) {
            toast.error('All fields are required except the image!');
            return;
        }
        if (!imageBase64 && !id) {
            toast.error('Image is required for new clinic!');
            return;
        }
        let data = {
            id,
            name,
            address,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
        };
        let res = id ? await updateClinic(data) : await createClinic(data);

        if (res && res.errCode === 0) {
            toast.success(id ? 'Update clinic succeed!' : 'Add new clinic succeed!');
            this.setState({
                id: null,
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });

            if (this.props.fetchClinics) {
                this.props.fetchClinics();
            }
        } else {
            toast.error(res.errMessage || 'Something went wrong...');
        }
    }

    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='title'>
                    <FormattedMessage id='admin.manage-clinic.title' />
                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='admin.manage-clinic.name-clinic' /></label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='admin.manage-clinic.image-clinic' /></label>
                        <input className='form-control-file image' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                        {this.state.imageBase64 && (
                            <img
                                src={this.state.imageBase64}
                                alt="Handbook"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='admin.manage-clinic.address-clinic' /></label>
                        <input className='form-control' type='text' value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12 mt-3'>
                        <button
                            className='btn btn-primary'
                            onClick={this.handleSaveClinic}
                        >
                            {this.state.id ? 'Update' : 'Save'}
                        </button>
                    </div>
                    <div className='col-12 mt-3 mb-3'>
                        <TableClinic
                            handleEditClinic={this.handleEditClinic}
                            fetchClinics={this.fetchClinics}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
