import { useEffect, useState } from "react";
import LPRender from "../../../../components/LP/LPRender";
import TestTemplate from "../../../../constants/LPTemplateDefault";
import TestTemplateMobile from "../../../../constants/LPTemplateDefaultMobile";
import LP_LEADS_REQUEST_TYPE from "../../../../constants/LPLeadsRequestType";
import { useParams } from "react-router-dom";
import cookiesHelper from "../../../../helpers/cookiesHelper";
import {
  FORM_LP_EMAIL_NAME_ID,
  FORM_LP_EMAIL_TYPE,
} from "../../../../constants/LpContants";
import leads_events from "../../../../models/leads_events";

const isMobile = true;
const INIT_STATE = isMobile ? TestTemplateMobile() : TestTemplate();

function ViewLandingPage() {
  const [script, _] = useState(INIT_STATE);
  const { route_lp_view_id } = useParams();

  useEffect(() => {
    makeAcess();
  }, []);

  async function makeAcess() {
    let bodyData = {
      cookies: document.cookie,
      type: LP_LEADS_REQUEST_TYPE.ACCESS,
      href: window.location.href,
      data: {
        lp_id: script.id,
      },
    };

    const user_email = cookiesHelper.getCookie(FORM_LP_EMAIL_NAME_ID);

    if (user_email) {
      bodyData = {
        ...bodyData,
        email: user_email.split("=")[1],
      };
    }

    console.log("Aqui deve ter uma request de acesso, params:", bodyData);
    const response = await leads_events.subscription_form(
      bodyData,
      script.organization_id
    );
    // alert(response);
  }
  return (
    <div style={{ width: "100vw", overflowX: "auto" }}>
      <LPRender script={script} readOnly={true} isMobile={isMobile} />
    </div>
  );
}

export default ViewLandingPage;
