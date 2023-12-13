import React, { useEffect, useState } from "react";
import segments from "../../../models/segments";
import {
  Col,
  Row,
  Card,
  CardBody,
  Form,
  Input,
  Label,
  CardTitle,
  Button,
} from "reactstrap";
import comum from "../../../helpers/comum";
import { MdDelete } from "react-icons/md";

function DynamicForm({ onDataChange }) {
  const [rules, setRules] = useState([]);
  const [form, setForm] = useState([]);
  const [values, setValues] = useState({
    operation: "and", /// and | or
  });

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    runTestSegment();
  }, [values]);

  async function init() {
    const data = await segments.get_rules();
    setRules(data);
    if (form.length == 0 && data.length > 0) {
      addRule(data[0].group, data);
    }
  }

  function addRule(rule, use_data = rules) {
    const selectedRule = use_data.find((e) => e.group === rule);
    if (!selectedRule) return;
    const ids = comum.GenerateId(10);
    setForm([
      ...form,
      {
        id: ids,
        name: selectedRule.group,
        type: selectedRule.class,
        filters:
          selectedRule?.filters.map((e) => {
            return { ...e };
          }) ?? [],
        restrict: selectedRule?.restrict ?? [],
      },
    ]);
  }

  function onChange(id, value) {
    setValues({
      ...values,
      [id]: value,
    });
  }

  function deleteFormItem(ids) {
    const s = form.filter((e) => e.id != ids);
    setForm(s);
  }

  function validateRestrict(restricts = []) {
    if (restricts.length === 0) return true;

    const dins = restricts.filter((e) => !e.value.includes(values?.[e.id]));

    return dins.length === 0;
  }

  async function runTestSegment() {
    const data = await segments.run_test(form, values);
    onDataChange(data);
  }

  return (
    <div>
      <Row style={{ alignItems: "center" }}>
        <Col>
          <Form>
            <select value="" onChange={({ target }) => addRule(target.value)}>
              <option />
              {rules.map((e) => (
                <option key={e.group} value={e.group}>
                  {e.group}
                </option>
              ))}
            </select>
          </Form>
        </Col>
        <Col xs={1}>
          <Button onClick={() => {}}>Salvar</Button>
        </Col>
      </Row>

      <br />
      <div>
        {form.map((group, groupIndex) => (
          <>
            <Card key={groupIndex} className="mb-2">
              <CardBody>
                <Row style={{ alignItems: "center" }}>
                  <Col xs={1}>
                    <Button onClick={() => deleteFormItem(group.id)}>
                      <MdDelete />
                    </Button>
                  </Col>
                  <Col>
                    <Row>
                      {group?.filters?.map((filter) => (
                        <Col xs={4} key={filter.id}>
                          {validateRestrict(filter?.restrict) ? (
                            <div>
                              {filter.type === "select" ? (
                                <select
                                  placeholder={filter.name}
                                  onChange={({ target }) =>
                                    onChange(filter.id, target.value)
                                  }
                                  style={{ width: "100%" }}
                                >
                                  <option value="" disabled selected>
                                    {filter.name}
                                  </option>
                                  {filter.options.map((psts) => (
                                    <option key={psts} value={psts}>
                                      {psts}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <Input
                                  onChange={({ target }) =>
                                    onChange(filter.id, target.value)
                                  }
                                  type={filter.type}
                                  id={filter.id}
                                  value={values?.[filter.id]}
                                  className={filter.id}
                                />
                              )}
                            </div>
                          ) : null}
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            {groupIndex != form.length - 1 ? (
              <div className="mb-2">
                <center>
                  <select
                    onChange={({ target }) =>
                      setValues({ ...values, operation: target.value })
                    }
                    value={values.operation ?? "and"}
                  >
                    <option value="or">OU</option>
                    <option value="and">E</option>
                  </select>
                </center>
              </div>
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
}

export default DynamicForm;
