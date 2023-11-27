import api from "../service/api";

async function acess_lp(body) {
  console.log(body);
  return "Falta fazer o model.";
}

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

export default {
  acess_lp,
  subscription_form,
};
