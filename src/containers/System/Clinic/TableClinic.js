import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getManageClinic, deleteClinic } from '../../../services/userService';
import './TableClinic.scss';

class TableClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
            error: null,
            currentPage: 1,
            clinicsPerPage: 10, // Hiển thị 10 phòng khám mỗi trang
        };
    }

    fetchClinics = async () => {
        try {
            let res = await getManageClinic();
            if (res && res.errCode === 0) {
                this.setState({
                    clinics: res.data,
                });
            } else {
                this.setState({
                    error: res.errMessage || 'Không tìm thấy danh sách phòng khám.',
                });
            }
        } catch (error) {
            console.error('Error fetching clinics:', error);
            this.setState({
                error: 'Có lỗi xảy ra khi tải dữ liệu.',
            });
        }
    };

    async componentDidMount() {
        await this.fetchClinics();
    }

    handleDeleteClinic = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa phòng khám này?')) return;

        try {
            let res = await deleteClinic(id);
            if (res && res.errCode === 0) {
                toast.success('Xóa phòng khám thành công!');
                await this.fetchClinics();
            } else {
                toast.error(res.errMessage || 'Xóa phòng khám thất bại.');
            }
        } catch (error) {
            console.error('Error deleting clinic:', error);
            toast.error('Có lỗi xảy ra khi xóa phòng khám.');
        }
    }

    // Phân trang
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    // Chuyển đến trang trước hoặc sau
    handleNextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.clinics.length / this.state.clinicsPerPage)) {
            this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
        }
    }

    handlePrevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
        }
    }

    render() {
        let { clinics, error, currentPage, clinicsPerPage } = this.state;

        // Tính toán các phòng khám cần hiển thị cho trang hiện tại
        const indexOfLastClinic = currentPage * clinicsPerPage;
        const indexOfFirstClinic = indexOfLastClinic - clinicsPerPage;
        const currentClinics = clinics.slice(indexOfFirstClinic, indexOfLastClinic);

        // Tính toán tổng số trang
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(clinics.length / clinicsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <table id="TableClinic">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentClinics.length > 0 ? (
                            currentClinics.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => this.props.handleEditClinic(item)}
                                        >
                                            <i className="fas fa-user-edit"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => this.handleDeleteClinic(item.id)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">{error || 'Không có dữ liệu'}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={this.handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        &#60; Prev
                    </button>
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => this.handlePageChange(number)}
                            className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        className="pagination-btn"
                        onClick={this.handleNextPage}
                        disabled={currentPage === pageNumbers.length}
                    >
                        Next &#62;
                    </button>
                </div>
            </div>
        );
    }
}

export default TableClinic;
