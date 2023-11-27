import api from "../service/api";

async function get_leads() {
  try {
    const { data } = await api.get(`/api/leads`);
    return data;
  } catch {
    return [];
  }
}

export default { get_leads };
