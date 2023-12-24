import api from "../service/api";

type EventFlow = {
  email: string,
  lead_id: string,
  data: any,
  type: string,
  href?: string,
};

async function send_event(body: EventFlow) {
  try {
    const { data } = await api.post("/api/leads", body, {});
    return data;
  } catch {
    return false;
  }
}

async function get_dash() {
  try {
    const { data } = await api.get("/api/leads/dash-home");
    return data;
  } catch {
    return false;
  }
}

async function delete_event(id_event) {
  try {
    const { data } = await api.delete(`/api/events/delete/${id_event}`);
    return data;
  } catch {
    return false;
  }
}

export default {
  send_event,
  delete_event,
  get_dash,
};
