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

export default { get_leads, get_lead_by_id };
