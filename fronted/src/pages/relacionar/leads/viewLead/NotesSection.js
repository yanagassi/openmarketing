// NotesSection.js
import React, { useState } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import leads from "../../../../models/leads";
import { MdEdit, MdSave } from "react-icons/md";

const NotesSection = ({ lead }) => {
  const [active, setActive] = useState(false);

  const [oldNotes, setOldNotes] = useState(lead?.notes ?? "");
  const [notes, setNotes] = useState(lead?.notes ?? "");

  async function alter_notes(notes = "") {
    const data = await leads.alter_lead(lead.id, {
      notes,
    });
    if (data) {
      setOldNotes(notes);
    }
  }

  return (
    <Card className="mt-2">
      <CardHeader>
        <span className="panel-title">Anotações</span>
      </CardHeader>
      <form className="loading-container" method="post">
        <CardBody>
          {active ? (
            <textarea
              rows="5"
              className="form-control"
              value={notes}
              onChange={({ target }) => setNotes(target.value)}
              style={{ maxWidth: "100%", minHeight: 60 }}
            >
              {notes}
            </textarea>
          ) : (
            <p>{notes ?? "Não há anotações."}</p>
          )}
          <Button
            color="primary"
            className="btn btn-default btn-sm mt-2"
            onClick={() => {
              if (!active) {
                setActive(!active);
              } else {
                setActive(!active);

                alter_notes(notes);
              }
            }}
          >
            {active ? <MdSave /> : <MdEdit />}
          </Button>{" "}
          {active ? (
            <Button
              className="btn btn-default btn-sm mt-2"
              onClick={() => {
                setActive(!active);
                setNotes(oldNotes);
              }}
            >
              Fechar
            </Button>
          ) : null}
        </CardBody>
      </form>
    </Card>
  );
};

export default NotesSection;
