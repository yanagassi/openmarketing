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

async function get_email(id, emailData = true) {
  try {
    const { data } = await api.get(`/api/email/${id}/${emailData}`);
    return data;
  } catch {
    return false;
  }
}

async function update_email(id, body) {
  try {
    const { data } = await api.put(`/api/email/${id}`, body);
    return true;
  } catch {
    return false;
  }
}

export default {
  list_all,
  create_email,
  delete_email,
  update_email,
  get_email,
};
