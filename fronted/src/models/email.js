import api from "../service/api";

async function list_all() {
  try {
    const { data } = await api.get(`/api/email`);
    return data;
  } catch {
    return [];
  }
}

async function delete_email(id) {
  try {
    const { data } = await api.delete(`/api/email/${id}`);
    return true;
  } catch {
    return false;
  }
}

async function create_email(body) {
  try {
    const { data } = await api.post(`/api/email`, body);
    return true;
  } catch {
    return false;
  }
}

export default {
  list_all,
  create_email,
  delete_email,
};
