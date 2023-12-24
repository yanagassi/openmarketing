// TagsSection.js
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Badge,
  Row,
} from "reactstrap";
import leads from "../../../../models/leads";
import { MdClose } from "react-icons/md";

const TagsSection = ({ lead }) => {
  const [active, setActive] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(lead.tags ?? []);

  async function alter(my_tag = "", remove = false) {
    let body = [];
    if (remove) {
      body = tags.filter((e) => {
        if (my_tag !== e && e != "") {
          return e;
        }
      });
    } else {
      if (my_tag === "") return;
      body = [...tags, tag];
      body = [...new Set(body)];
      setTag("");
    }

    const data = await leads.alter_lead(lead.id, { tags: body });
    if (data) {
      setTags(body);
    }
  }

  return (
    <Card className="mt-2">
      <CardHeader>
        <h6 className="panel-title">Tags</h6>
      </CardHeader>
      <CardBody>
        <p>
          {tags.length === 0 ? (
            <small>Este Lead não possui tags.</small>
          ) : (
            <Row style={{ display: "flex", flexDirection: "row" }}>
              {tags.map((e) => (
                <div>
                  <Badge>
                    <span className="tag-badge">{e}</span>{" "}
                    <a
                      className="tag-badge-remove"
                      onClick={() => alter(e, true)}
                    >
                      <MdClose />
                    </a>
                  </Badge>
                </div>
              ))}
            </Row>
          )}
        </p>

        {active ? (
          <Input
            value={tag}
            onChange={({ target }) => setTag(target.value.replace(" ", ""))}
          />
        ) : null}

        <div className="panel-footer mt-2">
          <Button
            className="btn btn-default btn-sm"
            role="button"
            color={active ? "primary" : "secondary"}
            onClick={() => {
              if (!active) {
                setActive(!active);
              } else {
                alter(tag);
              }
            }}
          >
            {!active ? "Novo" : "Adicionar"}
          </Button>{" "}
          {active ? (
            <Button
              className="btn btn-default btn-sm"
              role="button"
              onClick={() => setActive(!active)}
            >
              Fechar
            </Button>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
};

export default TagsSection;
