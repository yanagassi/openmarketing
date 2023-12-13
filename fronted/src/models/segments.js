import api from "../service/api";

async function get_segments() {
  try {
    const { data } = await api.get(`/api/segments`);
    return data;
  } catch {
    return [];
  }
}

async function get_rules() {
  try {
    const { data } = await api.get(`/api/segments/rules`);
    return data;
  } catch {
    return [];
  }
}

async function run_test(filters, values) {
  try {
    const { data } = await api.post(`/api/segments/test`, { filters, values });
    return data;
  } catch {
    return [];
  }
}

export default { get_segments, get_rules, run_test };
