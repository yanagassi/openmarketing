import api from "../service/api";

async function subscription_form(body, organization_id) {
  try {
    const { data } = await api.post("/api/leads", body, {
      headers: {
        OrganizationId: organization_id,
      },
    });
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

export default {
  subscription_form,
  get_dash,
};
