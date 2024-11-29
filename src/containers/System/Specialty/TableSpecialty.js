import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getManageSpecialty, deleteSpecialty } from '../../../services/userService';
import './TableSpecialty.scss';

class TableSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
            error: null,
            currentPage: 1,
            specialtiesPerPage: 10, // Hiển thị 10 chuyên khoa mỗi trang
        };
    }

    fetchSpecialties = async () => {
        try {
            let res = await getManageSpecialty();
            if (res && res.errCode === 0) {
                this.setState({
                    specialties: res.data,
                });
            } else {
                this.setState({
                    error: res.errMessage || 'Không tìm thấy danh sách chuyên khoa.',
                });
            }
        } catch (error) {
            console.error('Error fetching specialties:', error);
            this.setState({
                error: 'Có lỗi xảy ra khi tải dữ liệu.',
            });
        }
    };

    async componentDidMount() {
        await this.fetchSpecialties();
    }

    handleDeleteSpecialty = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa chuyên khoa này?')) return;

        try {
            let res = await deleteSpecialty(id);
            if (res && res.errCode === 0) {
                toast.success('Xóa chuyên khoa thành công!');
                await this.fetchSpecialties(); // Tải lại danh sách sau khi xóa
            } else {
                toast.error(res.errMessage || 'Xóa chuyên khoa thất bại.');
            }
        } catch (error) {
            console.error('Error deleting specialty:', error);
            toast.error('Có lỗi xảy ra khi xóa chuyên khoa.');
        }
    }

    // Phân trang
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    handleNextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.specialties.length / this.state.specialtiesPerPage)) {
            this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
        }
    }

    handlePrevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
        }
    }

    render() {
        let { specialties, error, currentPage, specialtiesPerPage } = this.state;

        // Tính toán các chuyên khoa cần hiển thị cho trang hiện tại
        const indexOfLastSpecialty = currentPage * specialtiesPerPage;
        const indexOfFirstSpecialty = indexOfLastSpecialty - specialtiesPerPage;
        const currentSpecialties = specialties.slice(indexOfFirstSpecialty, indexOfLastSpecialty);

        // Tính toán tổng số trang
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(specialties.length / specialtiesPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <table id="TableSpecialty">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSpecialties.length > 0 ? (
                            currentSpecialties.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => this.props.handleEditSpecialty(item)}
                                        >
                                            <i className="fas fa-user-edit"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => this.handleDeleteSpecialty(item.id)}
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

export default TableSpecialty;
