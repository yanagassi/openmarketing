import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import {
  Container,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Button,
  Row,
} from "reactstrap";
import email from "../../../models/email";
import CreateEmailModal from "./CreateEmailModal";
import comum from "../../../helpers/comum";

function EmailPage() {
  const [myEmails, setMyEmail] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);

  async function init() {
    const data = await email.list_all();
    setMyEmail(data);
  }

  async function deleteEmail(id) {
    // TODO: Adicionar modal de confirmação.
    const data = await email.delete_email(id);
    if (data) init();
  }

  useEffect(() => {
    init();
  }, [modalAdd]);

  return (
    <Container>
      <Col className="mt-4">
        <Row>
          <Col xs={10}>
            <h4 className="mb-4">
              Email{" "}
              <span style={{ fontWeight: "200" }}>({myEmails?.length})</span>
            </h4>
          </Col>

          <Col xs={2}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <Button onClick={() => setModalAdd(true)} color="primary">
                <FaPlus /> Novo
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
      <Table
        className="mt-1 table-press-lp"
        bordered
        responsive
        striped
        summary="Lista de Leads"
      >
        <thead>
          <tr>
            <th className="w-75"> Nome do Email</th>
            <th className="w-25">Ultima Edição</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myEmails.map((emailData) => (
            <tr>
              <td>{emailData.name}</td>
              <td>{comum.ParseDate(emailData.updated_at)}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    gap: 5,
                  }}
                >
                  <Col>
                    <Button
                      color="danger"
                      onClick={() => deleteEmail(emailData.id)}
                    >
                      <MdDelete />
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      color="primary"
                      onClick={() => comum.Redirect(`/email/${emailData.id}`)}
                    >
                      <MdEdit />
                    </Button>
                  </Col>
                  <Col>
                    <Button color="primary">
                      <MdVisibility />
                    </Button>
                  </Col>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CreateEmailModal isOpen={modalAdd} toggle={() => setModalAdd(false)} />
    </Container>
  );
}

export default EmailPage;
