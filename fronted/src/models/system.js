import api from "../service/api";

async function get_form_variables() {
  try {
    const { data } = await api.get(`/api/system/form-types`);
    return data;
  } catch {
    return { operations: [] };
  }
}

async function get_form_variables_private() {
  try {
    const { data } = await api.get(`/api/system/form-types-private`);
    return data;
  } catch {
    return [];
  }
}

export default {
  get_form_variables,
  get_form_variables_private,
};
