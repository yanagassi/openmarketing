import { useState } from "react";
import LPRender from "../../../../components/LP/LPRender";
import TestTemplate from "../../../../constants/LPTemplateDefault";
import TestTemplateMobile from "../../../../constants/LPTemplateDefaultMobile";

const isMobile = false;
const INIT_STATE = isMobile ? TestTemplateMobile() : TestTemplate();

function ViewLandingPage() {
  const [script, _] = useState(INIT_STATE);

  return (
    <div style={{ width: "100vw", overflowX: "auto" }}>
      <LPRender script={script} readOnly={true} isMobile={isMobile} />
    </div>
  );
}

export default ViewLandingPage;
