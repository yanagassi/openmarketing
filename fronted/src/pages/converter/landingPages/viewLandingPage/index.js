import { useEffect, useState } from "react";
import LPRender from "../../../../components/LP/LPRender";
import TestTemplate from "../../../../constants/LPTemplateDefault";
import TestTemplateMobile from "../../../../constants/LPTemplateDefaultMobile";
import LP_LEADS_REQUEST_TYPE from "../../../../constants/LPLeadsRequestType";
import { useParams } from "react-router-dom";
import cookiesHelper from "../../../../helpers/cookiesHelper";
import landing_pages from "../../../../models/landing_pages";

import { FORM_LP_EMAIL_NAME_ID } from "../../../../constants/LpContants";
import leads_events from "../../../../models/leads_events";
import comum from "../../../../helpers/comum";

const isMobile = comum.isMobile();

function ViewLandingPage() {
  const [script, setScript] = useState({});
  const [load, setLoad] = useState(true);
  const { route_lp_view_id } = useParams();

  useEffect(() => {
    init();
    makeAcess();
  }, []);

  async function init() {
    let data = await landing_pages.get_lp(route_lp_view_id);
    if (!data) {
      return;
    }
    if (typeof data == "string") {
      data = JSON.parse(data);
    }
    setScript(isMobile ? data.mobile : data.desktop);
    setLoad(false);
  }

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

    const response = await leads_events.send_event(bodyData);
    // alert(response);
  }
  if (load) {
    return null;
  }
  return (
    <div style={{ width: "100vw", overflowX: "auto" }}>
      <LPRender script={script} readOnly={true} isMobile={isMobile} />
    </div>
  );
}

export default ViewLandingPage;
