import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import email from "../../../models/email";
import segments from "../../../models/segments";
import CardDropdown from "../../../components/CardDropdown";
import { Button, Col, Container, Input, Label, Row } from "reactstrap";
import MenuGenerical from "../../../components/MenuGenerical";
import comum from "../../../helpers/comum";
import { toast } from "react-toastify";

import texts from "../../../constants/texts";
import EmailVariables from "./EmailVariables";

function EmailOptions({}) {
  const { id_email } = useParams();
  const [emailOptions, setEmailOptions] = useState({});
  const [variablesModal, setVariablesModal] = useState(false);

  const [segmentos, setSegments] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const resSeg = await segments.get_segments();
    const responseData = await email.get_email(id_email, false);
    setEmailOptions(responseData);
    setSegments(resSeg);
  }

  async function updateItem(key, value) {
    setEmailOptions({
      ...emailOptions,
      [key]: value,
    });
  }

  async function updateInApi(key, value) {
    const data = await email.update_email(id_email, { [key]: value });
  }

  async function sendEmail() {
    const data = await email.send_email({
      id: id_email,
      from: emailOptions.from,
    });
    if (data) {
      toast.success(
        "E-mails enviados com sucesso, para os destinatários selecionados!"
      );
    } else {
      toast.error(
        "Não foi possivel enviar os e-mails, por favor tente novamente."
      );
    }
  }

  const btnSend = (
    <Button
      color="primary"
      className="button-mid-height"
      disabled={!emailOptions?.from}
      onClick={() => sendEmail()}
    >
      Enviar Email
    </Button>
  );

  return (
    <div className="mb-4">
      <MenuGenerical title={emailOptions.name} hideSave={true}>
        {btnSend}
      </MenuGenerical>

      <Container style={{ marginTop: 70 }}>
        <div>
          <CardDropdown
            title="Nome de Identificação"
            success={emailOptions?.name}
            blockButton={!emailOptions.name}
            sobrescription={`Nome que você utiliza para o email, atualmente é ${emailOptions.name}.`}
            onEdit={() => {
              if (emailOptions?.name && emailOptions.name !== "") {
                updateInApi("name", emailOptions.name);
              }
            }}
          >
            <Col xs={8}>
              <div className="mt-2">
                <Input
                  value={emailOptions.name}
                  onChange={({ target }) => updateItem("name", target.value)}
                />
              </div>
            </Col>
          </CardDropdown>

          <CardDropdown
            title="Destinatários"
            sobrescription="Selecione as listas de segmentação para receber sua campanha."
          >
            <div>
              <Label>Segmentações:</Label>
              <br />
              <select
                className="form-select mt-1"
                onChange={({ target }) => updateItem("from", target.value)}
              >
                <option disabled selected />
                {segmentos.map((e) => (
                  <option value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
          </CardDropdown>

          <CardDropdown
            sobrescription={
              "Adicione aqui o assunto do seu email" +
              (emailOptions?.subject
                ? `, o atual é ${emailOptions?.subject}.`
                : ".")
            }
            success={emailOptions?.subject}
            title="Assunto"
            description={texts.TEXT_ASSUNTO_DICAS}
            onEdit={() => updateInApi("subject", emailOptions?.subject ?? "")}
          >
            <Row className="align-items-end">
              <Col xs={10}>
                <Input
                  value={emailOptions?.subject ?? ""}
                  onChange={({ target }) => updateItem("subject", target.value)}
                />
              </Col>
              <Col xs={2}>
                <Button
                  className="mb-1"
                  color="transparent"
                  onClick={() => setVariablesModal(true)}
                >
                  <span className="text-primary">
                    <b>Inserir Variável</b>
                  </span>
                </Button>
              </Col>
            </Row>
          </CardDropdown>

          <CardDropdown
            title="Conteúdo"
            success={emailOptions?.exists_html}
            onEditClick={() => comum.Redirect("/email/" + id_email)}
            sobrescription="Você pode editar o layout escolhido."
            editFixed={true}
          />

          <CardDropdown
            title="Remetente"
            sobrescription="O envio será feito de acordo com o remetente que você adicionar aqui."
            success={emailOptions?.sender_name && emailOptions?.sender}
            blockButton={!emailOptions?.sender_name || !emailOptions?.sender}
            onEdit={() => {
              updateInApi("sender_name", emailOptions?.sender_name ?? "");
              updateInApi("sender", emailOptions?.sender ?? "");
            }}
          >
            <div>
              <Label>Nome do Remetente</Label>
              <Input
                value={emailOptions?.sender_name ?? ""}
                onChange={({ target }) =>
                  updateItem("sender_name", target.value)
                }
              />
            </div>
            <div>
              <Label>E-mail do Remetente</Label>
              <Input
                type="email"
                value={emailOptions?.sender ?? ""}
                onChange={({ target }) => updateItem("sender", target.value)}
              />
            </div>
          </CardDropdown>
        </div>
        <div className="mt-4">{btnSend}</div>
      </Container>
      <EmailVariables
        isOpen={variablesModal}
        onChange={(e) => {
          updateItem("subject", `${emailOptions.subject} ${e.key}`);
          setVariablesModal(false);
        }}
        toggle={() => setVariablesModal(false)}
      />
    </div>
  );
}

export default EmailOptions;
