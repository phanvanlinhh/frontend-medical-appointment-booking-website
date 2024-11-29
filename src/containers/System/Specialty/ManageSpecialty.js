import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { createSpecialty, updateSpecialty } from '../../../services/userService'
import TableSpecialty from './TableSpecialty';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
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
    handleSaveNewSpecialty = async () => {
        let res = await createSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        }
        else {
            toast.error('Something wrong...')
        }
    }
    handleEditSpecialty = (specialty) => {
        this.setState({
            id: specialty.id,
            name: specialty.name,
            imageBase64: specialty.image,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
        });
    };
    handleSaveSpecialty = async () => {
        let { id, name, imageBase64, descriptionHTML, descriptionMarkdown } = this.state;
        if (!name || !descriptionHTML || !descriptionMarkdown) {
            toast.error('All fields are required except the image!');
            return;
        }
        // Nếu không chọn ảnh mới và không có ảnh cũ, thông báo lỗi
        if (!imageBase64 && !id) {
            toast.error('Image is required for new specialties!');
            return;
        }
        let data = {
            id,
            name,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
        };

        // Nếu có ID -> Cập nhật, nếu không -> Tạo mới
        let res = id ? await updateSpecialty(data) : await createSpecialty(data);

        if (res && res.errCode === 0) {
            toast.success(id ? 'Update specialty succeed!' : 'Add new specialty succeed!');
            this.setState({
                id: null,
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
            // Gọi lại fetchSpecialties để cập nhật lại bảng
            if (this.props.fetchSpecialties) {
                this.props.fetchSpecialties();
            }
        } else {
            toast.error(res.errMessage || 'Something went wrong...');
        }
    };



    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='title'>
                    <FormattedMessage id='admin.manage-specialty.title' />
                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='admin.manage-specialty.name-specialty' /></label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='admin.manage-specialty.image-specialty' /></label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                        {this.state.imageBase64 && (
                            <img
                                src={this.state.imageBase64}
                                alt="Specialty"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '450px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12 mt-3'>
                        {/* <button className='btn btn-primary' onClick={() => this.handleSaveNewSpecialty()}>
                            Save
                        </button> */}
                        <button
                            className='btn btn-primary'
                            onClick={this.handleSaveSpecialty}
                        >
                            {this.state.id ? 'Update' : 'Save'}
                        </button>
                    </div>
                    <div className='col-12 mt-3 mb-3'>
                        <TableSpecialty
                            handleEditSpecialty={this.handleEditSpecialty}
                            fetchSpecialties={this.fetchSpecialties}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
