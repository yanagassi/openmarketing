import api from "../service/api";

async function get_leads() {
  try {
    const { data } = await api.get(`/api/leads`);
    return data;
  } catch {
    return [];
  }
}

async function get_lead_by_id(id) {
  try {
    const { data } = await api.get(`/api/leads/${id}`);
    return data;
  } catch {
    return [];
  }
}

async function alter_lead(id, body) {
  try {
    const { data } = await api.put(`/api/leads/${id}`, body);
    return true;
  } catch {
    return false;
  }
}

export default { get_leads, get_lead_by_id, alter_lead };
