import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

//doctor
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

//patient
const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

//specialty
const createSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const getManageSpecialty = () => {
    return axios.get(`/api/get-all-specialty-manage`)
}
const deleteSpecialty = async (id) => {
    return axios.delete('/api/delete-specialty', {
        data: { id: id },
    });
}
const updateSpecialty = (data) => {
    return axios.put('/api/update-specialty', data);
}

//clinic
const createClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getManageClinic = () => {
    return axios.get(`/api/get-all-clinic-manage`)
}
const deleteClinic = async (id) => {
    return axios.delete('/api/delete-clinic', {
        data: { id: id },
    });
}
const updateClinic = (data) => {
    return axios.put('/api/update-clinic', data);
}

//handbook
const createHandbook = (data) => {
    return axios.post(`/api/create-new-handbook`, data)
}
const getAllHandbook = () => {
    return axios.get(`/api/get-handbook`)
}
const getAllDetailHandbookById = (data) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`)
}
const getManageHandbook = () => {
    return axios.get(`/api/get-all-handbook-manage`)
}
const deleteHandbook = async (id) => {
    return axios.delete('/api/delete-handbook', {
        data: { id: id },
    });
}
const updateHandbook = (data) => {
    return axios.put('/api/update-handbook', data);
}

export {
    handleLoginApi, getAllUsers, createNewUserService,
    deleteUserService, editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService,
    getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById, postPatientBookAppointment,
    postVerifyBookAppointment, createSpecialty, getAllSpecialty,
    getAllDetailSpecialtyById, createClinic, getAllClinic,
    getAllDetailClinicById, getAllPatientForDoctor, postSendRemedy,
    getManageSpecialty, deleteSpecialty, updateSpecialty,
    createHandbook, getAllHandbook, getAllDetailHandbookById,
    getManageHandbook, deleteHandbook, updateHandbook,
    getManageClinic, deleteClinic, updateClinic
}