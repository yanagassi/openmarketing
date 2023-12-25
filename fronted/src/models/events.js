import api from "../service/api";

async function list_all() {
  try {
    const { data } = await api.get(`/api/events`);
    return data;
  } catch {
    return false;
  }
}

export default {
  list_all,
};
