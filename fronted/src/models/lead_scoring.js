import api from "../service/api";

async function save_interesse(body) {
  try {
    const { data } = await api.post(`/api/lead-scoring/interesse`, body);
    return data;
  } catch {
    return false;
  }
}

async function save_perfil(body) {
  try {
    const { data } = await api.post(`/api/lead-scoring`, body);
    return data;
  } catch {
    return false;
  }
}

async function edit_perfil(body) {
  try {
    const { data } = await api.put(`/api/lead-scoring`, body);
    return data;
  } catch {
    return false;
  }
}

async function list_perfil() {
  try {
    const { data } = await api.get(`/api/lead-scoring`);
    return data;
  } catch {
    return [];
  }
}

async function list_interesse() {
  try {
    const { data } = await api.get(`/api/lead-scoring/interesse`);
    return data;
  } catch {
    return [];
  }
}

async function edit_interesse(body) {
  try {
    const { data } = await api.put(`/api/lead-scoring/interesse`, body);
    return data;
  } catch {
    return [];
  }
}

export default {
  save_interesse,
  save_perfil,
  list_perfil,
  edit_perfil,
  list_interesse,
  edit_interesse,
};
