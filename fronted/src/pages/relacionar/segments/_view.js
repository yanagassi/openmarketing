import React, { useState } from "react";
import { Container, Col, Button, Table, Row } from "reactstrap";
import DynamicForm from "./_DynamicForm";
import products from "./products.json";

const initialFilter = [
  {
    id: "HASH_ALEATORIO_1",
    name: "ProductId",
    type: "select",
    options: ["1", "2"],
  },
  {
    id: "HASH_ALEATORIO_2",
    name: "ProductName",
    type: "select",
    options: ["tipos de evento"],
    restrict: { id: "HASH_ALEATORIO_1", value: "2", operation: "eq" },
  },
];

const operatorsList = [
  { label: "Contém", value: "contains" },
  { label: "Igual", value: "eq" },
  { label: "Maior que", value: "gt" },
  { label: "Menor que", value: "lt" },
];

const SegmentView = () => {
  const [filter, setFilter] = useState(initialFilter);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);

  const applyFilter = (product, filters, options) => {
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];

      const isRestricted =
        filter.restrict &&
        filter.restrict.id &&
        filter.restrict.value &&
        filter.restrict.operation &&
        filters.some(
          (ff) =>
            ff.id === filter.restrict.id &&
            applyFilterOption(options, ff) === filter.restrict.value
        );

      if (filter.name === "ProductName" && (!isRestricted || isRestricted)) {
        return true;
      }

      if (!filter.restrict || (filter.restrict && isRestricted)) {
        if (applyFilterOption(options, filter) !== product[filter.name]) {
          return false;
        }
      }
    }

    return true;
  };

  const filteredData = products.filter(applyFilter).slice(skip, skip + take);

  const handleFilterChange = (event) => {
    setFilter(event.filter);
    setSkip(0);
  };

  const handlePageChange = (newSkip) => {
    setSkip(newSkip);
  };

  const handleInputChange = (id, value) => {
    setFilter((prevFilter) => {
      const newFilters = prevFilter.map((filter) =>
        filter.id === id ? { ...filter, value } : filter
      );
      return newFilters;
    });
  };

  const handleOperatorChange = (id, operator) => {
    setFilter((prevFilter) => {
      const newFilters = prevFilter.map((filter) =>
        filter.id === id ? { ...filter, operator } : filter
      );
      return newFilters;
    });
  };

  const handleFieldChange = (id, field) => {
    setFilter((prevFilter) => {
      const newFilters = prevFilter.map((filter) =>
        filter.id === id ? { ...filter, field } : filter
      );
      return newFilters;
    });
  };

  const handleAddFilter = () => {
    setFilter((prevFilter) => [
      ...prevFilter,
      {
        id: `newFilter_${Date.now()}`,
        field: Object.keys(products[0])[0],
        operator: "contains",
        value: "",
      },
    ]);
  };

  const handleRemoveFilter = (id) => {
    setFilter((prevFilter) => prevFilter.filter((filter) => filter.id !== id));
  };

  const applyFilterOption = (options, filter) => {
    if (filter.type === "select") {
      const selectedOption = options.find((opt) => opt.id === filter.id);
      return selectedOption ? selectedOption.value : "";
    }

    return filter.value;
  };

  return (
    <div
      className="mb-4 mt-4 ml-4"
      style={{ paddingLeft: "2%", paddingRight: "2%" }}
    >
      <Row>
        <Col xs={8} className="mt-8">
          <h4 className="mb-4">Filtros</h4>
          <DynamicForm
            filters={filter}
            onInputChange={handleInputChange}
            onOperatorChange={handleOperatorChange}
            onFieldChange={handleFieldChange}
            onAddFilter={handleAddFilter}
            operatorsList={operatorsList}
            products={products}
            applyFilterOption={applyFilterOption}
            onRemoveFilter={handleRemoveFilter}
          />
        </Col>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                {Object.keys(products[0]).map((field) => (
                  <th key={field}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product, index) => (
                <tr key={index}>
                  {Object.keys(products[0]).map((field) => (
                    <td key={field}>{product[field]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <div>
            <Button
              onClick={() => handlePageChange(skip - take)}
              disabled={skip === 0}
              className="mr-2"
            >
              Página Anterior
            </Button>
            <Button
              onClick={() => handlePageChange(skip + take)}
              disabled={skip + take >= filteredData.length}
            >
              Próxima Página
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SegmentView;
