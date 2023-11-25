import api from "../service/api";

async function get_lp(lp_id) {
  try {
    const { data } = await api.get(`/api/landing-pages/${lp_id}`);
    return data;
  } catch {
    return false;
  }
}

export default { get_lp };
