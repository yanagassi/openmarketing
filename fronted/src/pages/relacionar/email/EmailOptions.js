import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import email from "../../../models/email";
import CardDropdown from "../../../components/CardDropdown";
import { Container } from "reactstrap";
import MenuGenerical from "../../../components/MenuGenerical";

import texts from "../../../constants/texts";
function EmailOptions({}) {
  const { id_email } = useParams();
  const [emailOptions, setEmailOptions] = useState({});

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const responseData = await email.get_email(id_email, false);
    setEmailOptions(responseData);
  }
  return (
    <>
      <MenuGenerical title={emailOptions.name} onSave={() => {}} />

      <Container style={{ marginTop: 60 }}>
        <div>
          <CardDropdown title="Destinatários">
            <p>sss</p>
          </CardDropdown>

          <CardDropdown title="Assunto" description={texts.TEXT_ASSUNTO_DICAS}>
            <p>sss</p>
          </CardDropdown>

          <CardDropdown title="Remetente">
            <p>sss</p>
          </CardDropdown>
          <CardDropdown title="Conteúdo">
            <p>sss</p>
          </CardDropdown>
        </div>
      </Container>
    </>
  );
}

export default EmailOptions;
