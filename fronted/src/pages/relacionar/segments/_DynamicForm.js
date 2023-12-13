import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import segments from "../../../models/segments";

const DynamicForm = ({
  groups,
  selectedGroup,
  filters,
  onInputChange,
  onOperatorChange,
  onFieldChange,
  onAddFilter,
  products,
  operatorsList,
  onRemoveFilter,
  onGroupChange,
}) => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await segments.get_rules();
    setRules(data);
  }

  return (
    <Form>
      <Row>
        <Col xs={2}>
          <select type="select" onChange={onGroupChange} value={selectedGroup}>
            {groups.map((groupName) => (
              <option key={groupName} value={groupName}>
                {groupName}
              </option>
            ))}
          </select>
        </Col>
        <Col>
          <div>
            {Array.isArray(filters) &&
              filters.map((filter) => {
                const isRestricted =
                  filter.restrict &&
                  filter.restrict.id &&
                  filter.restrict.value &&
                  filter.restrict.operation &&
                  filters.some(
                    (ff) =>
                      ff.id === filter.restrict.id &&
                      ff.value !== filter.restrict.value
                  );

                if (isRestricted) {
                  return null;
                }

                return (
                  <FormGroup key={filter.id}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                      }}
                    >
                      {/* ... (your existing filter code) */}
                    </div>
                  </FormGroup>
                );
              })}
          </div>
        </Col>
      </Row>

      <Button onClick={onAddFilter} color="primary">
        Adicionar Filtro
      </Button>
    </Form>
  );
};

export default DynamicForm;
