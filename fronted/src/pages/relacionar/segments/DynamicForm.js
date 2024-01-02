import React, { useEffect, useState } from "react";
import segments from "../../../models/segments";
import { Col, Row, Card, CardBody, Form, Input, Button } from "reactstrap";
import comum from "../../../helpers/comum";
import { MdDelete, MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import "../../../assets/css/dynamic_form.css";
import MenuGenerical from "../../../components/MenuGenerical";
import { toast } from "react-toastify";

function DynamicForm({ onDataChange }) {
  const [rules, setRules] = useState([]);
  const [form, setForm] = useState([]);
  const [allData, setAllData] = useState({});
  const [values, setValues] = useState({
    operation: "and", /// and | or
  });

  const { id_segment } = useParams();

  const [ruleActive, setRuleActive] = useState(false);

  useEffect(() => {
    init();
    getSegment();
  }, []);

  useEffect(() => {
    if (form?.length > 0) {
      runTestSegment();
    }
  }, [values]);

  async function getSegment() {
    try {
      const data = await segments.get_segment(id_segment);
      if (data) {
        setAllData(data);
        setValues(data.values);
        setForm(data.form);
      }
    } catch (error) {
      console.error("Error getting segment:", error);
    }
  }

  async function init() {
    try {
      const data = await segments.get_rules();
      setRules(data);
      if (form?.length === 0 && data.length > 0) {
        // addRule(data[0].group, data);
      }
    } catch (error) {
      console.error("Error initializing:", error);
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
        filters: selectedRule?.filters?.map((e) => ({ ...e })) ?? [],
        restrict: selectedRule?.restrict ?? [],
      },
    ]);
    setRuleActive(false);
  }

  function onChange(id, value) {
    setValues({
      ...values,
      [id]: value,
    });
  }

  function deleteFormItem(ids) {
    const updatedForm = form.filter((e) => e.id !== ids);
    setForm(updatedForm);
  }

  function validateRestrict(restricts = []) {
    if (restricts.length === 0) return true;

    const dins = restricts.filter((e) => !e.value.includes(values?.[e.id]));

    return dins.length === 0;
  }

  async function runTestSegment() {
    try {
      const data = await segments.run_test(form, values);
      onDataChange(data);
    } catch (error) {
      console.error("Error running test segment:", error);
    }
  }

  async function save() {
    try {
      await segments.save(id_segment, form, values);
      toast.success("Segmentação salva com sucesso.");
    } catch (error) {
      console.error("Error saving segment:", error);
    }
  }

  return (
    <>
      <MenuGenerical onSave={save} title={allData.name} />
      <div className="dynamic-form-total">
        <div className="dynamic-form-container"></div>

        <br />
        <div>
          {form?.map((group, groupIndex) => (
            <>
              <Card key={groupIndex} className="mb-2">
                <CardBody>
                  <Row style={{ alignItems: "center" }}>
                    <Col xs={1}>
                      <Button
                        onClick={() => deleteFormItem(group.id)}
                        color="danger"
                      >
                        <MdDelete />
                      </Button>
                    </Col>
                    <Col>
                      <Row>
                        {group?.filters?.map((filter) => (
                          <Col key={filter.id}>
                            {validateRestrict(filter?.restrict) ? (
                              <div>
                                {filter.type === "select" ? (
                                  <select
                                    placeholder={filter.name}
                                    onChange={({ target }) =>
                                      onChange(filter.id, target.value)
                                    }
                                    style={{ width: "100%" }}
                                    value={values?.[filter.id]}
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

              {groupIndex !== form?.length - 1 ? (
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
          <Row className="mt-4">
            <div className="dynamic-final-page">
              <div>
                <Button
                  className="dynamic-form-container-btn1 button-mid-height"
                  color={!ruleActive ? "primary" : "danger"}
                  onClick={() => {
                    setRuleActive(!ruleActive);
                  }}
                >
                  {!ruleActive ? <FaPlus size={12} /> : <MdClose size={12} />}
                </Button>
              </div>

              <div>
                {ruleActive ? (
                  <select
                    className="dynamic-form-container-select"
                    value={form.name}
                    onChange={({ target }) => addRule(target.value)}
                  >
                    <option />
                    {rules.map((e) => (
                      <option key={e.group} value={e.group}>
                        {e.group}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
}

export default DynamicForm;
