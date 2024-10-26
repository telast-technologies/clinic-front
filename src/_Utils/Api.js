import axiosClient from './axiosCkient'; 

// STAFF
  const get_all_staff = (search, admin, active, currentPage) => {
    // Initialize the base URL
    let url = `/staff/?ordering=first_name&search=${search}&page=${currentPage}`;

    // Append optional parameters if they are not null
    if (admin != null) {
        url += `&is_client_admin=${admin}`;
    }
    if (active != null) {
        url += `&is_active=${active}`;
    }

    // Return the axios GET request
    return axiosClient.get(url);
};
  const get_single_staff = (id) => axiosClient.get(`/staff/${id}`);
  const add_staff = (staffData) => axiosClient.post(`/staff/`, staffData);
  const edit_staff = (staffData) => axiosClient.patch(`/staff/`, staffData);
  const delete_staff = (id) => axiosClient.delete(`/staff/${id}`);
  const permissions_select = () => axiosClient.get(`/system_management/permissions_select/`);

// Patient 
  const get_all_patient = (name, currentPage) => axiosClient.get(`/patients/patient?ordering=first_name&search=${name}&page=${currentPage}`);
  const get_single_patient = (id) => axiosClient.get(`/patients/patient/${id}`);
  const add_patient = (patientData) => axiosClient.post(`/patients/patient/`, patientData);
  const edit_patient = (id, patientData) => axiosClient.patch(`/patients/patient/${id}/`, patientData);
  const delete_patient = (id) => axiosClient.delete(`/patients/patient/${id}`);

//Service 
const get_all_service = (search, active, currentPage) => axiosClient.get(`/healthcare/service/?name=${search}&page=${currentPage}${active != null ? `&active=${active}` : ''}`);
const get_single_service = (id) => axiosClient.get(`/healthcare/service/${id}/`);
const add_service = (serviceData) => axiosClient.post(`/healthcare/service/`, serviceData);
const edit_service = (id, serviceData) => axiosClient.patch(`/healthcare/service/${id}/`, serviceData);
const delete_service = (id) => axiosClient.delete(`/healthcare/service/${id}`);

//Supply 
const get_all_supplies = (search, currentPage) => axiosClient.get(`/inventory/supply/?item=${search}&page=${currentPage}`);
const get_single_supply = (id) => axiosClient.get(`/inventory/supply/${id}/`);
const add_supply = (supplyData) => axiosClient.post(`/inventory/supply/`, supplyData);
const edit_supply = (id, supplyData) => axiosClient.patch(`/inventory/supply/${id}/`, supplyData);
const delete_supply = (id) => axiosClient.delete(`/inventory/supply/${id}`);

//Supply 
const get_all_visit_slots = (search, currentPage, endTime, startTime) => {
  let params = new URLSearchParams();

  if (search) params.append('days', search);
  if (startTime) params.append('start_time', startTime);
  if (endTime) params.append('end_time', endTime);
  
  params.append('page', currentPage);  // Always append the page
  
  return axiosClient.get(`/visits/slot/?${params.toString()}`);
};
const get_single_visit_slot = (id) => axiosClient.get(`/visits/slot/${id}/`);
const add_visit_slot = (supplyData) => axiosClient.post(`/visits/slot/`, supplyData);
const edit_visit_slot = (id, supplyData) => axiosClient.patch(`/visits/slot/${id}/`, supplyData);
const delete_visit_slot = (id) => axiosClient.delete(`/visits/slot/${id}`);

export default {
  get_all_staff,
  get_single_staff,
  add_staff,
  edit_staff,
  delete_staff,
  permissions_select,

  get_all_patient,
  get_single_patient,
  add_patient,
  edit_patient,
  delete_patient,

  get_all_service,
  get_single_service,
  add_service,
  edit_service,
  delete_service,

  get_all_supplies,
  get_single_supply,
  add_supply,
  edit_supply,
  delete_supply,

  get_all_visit_slots,
  get_single_visit_slot,
  add_visit_slot,
  edit_visit_slot,
  delete_visit_slot,
};