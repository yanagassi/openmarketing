import api from "../service/api";

async function get_lp(lp_id) {
  try {
    const { data } = await api.get(`/api/landing-pages/${lp_id}`);
    return data;
  } catch {
    return false;
  }
}

async function save(body) {
  try {
    const { data } = await api.post(`/api/landing-pages`, body);
    return data;
  } catch {
    return false;
  }
}

export default { get_lp, save };
