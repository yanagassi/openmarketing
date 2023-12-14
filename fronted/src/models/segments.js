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

async function save(id, form, values) {
  try {
    const { data } = await api.post(`/api/segments/save`, { id, form, values });
    return data;
  } catch {
    return false;
  }
}

async function get_segment(id) {
  try {
    const { data } = await api.get(`/api/segments/${id}`);
    return data;
  } catch {
    return { values: {}, form: [] };
  }
}

export default { get_segments, get_rules, run_test, save, get_segment };
