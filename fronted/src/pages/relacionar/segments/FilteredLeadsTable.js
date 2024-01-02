import React from "react";
import { Table } from "reactstrap";
import comum from "../../../helpers/comum";
import textConstants from "../../../constants/textConstants";

function FilteredLeadsTable({ dataView }) {
  const renameFields = (field) => {
    return textConstants.TEXT_TABLE_TRANSLATE[field] || field;
  };

  function get_ms(key, value) {
    try {
      const a = key?.[value];

      switch (typeof a) {
        case "string":
          // Verificar se é uma data usando a expressão regular
          return comum.validDateRegex(a) ? comum.ParseDate(a) : a;

        case "object":
          return Object.entries(a).map(([key, value]) => (
            <div key={key}>
              <b>{key}:</b> {get_ms(a, key)}
            </div>
          ));

        case "number":
          return a;

        case "boolean":
          return a ? "Sim" : "Não";

        default:
          return JSON.stringify(a);
      }
    } catch {
      return "";
    }
  }

  return (
    <Table
      striped
      hover
      style={{ overflow: "auto" }}
      className="dynamic-filter-table"
    >
      <thead>
        {dataView.length > 0 ? (
          <tr>
            <th style={{ minWidth: "150px" }}>{renameFields("name")}</th>
            <th style={{ minWidth: "150px" }}>{renameFields("email")}</th>
            {Object.keys(dataView[0])
              .filter(
                (field) =>
                  field !== "name" && field !== "email" && field !== "events"
              )
              .map((field) => (
                <th
                  key={field}
                  style={{ minWidth: field === "data" ? "400px" : "250px" }}
                >
                  {renameFields(field)}
                </th>
              ))}
          </tr>
        ) : null}
      </thead>
      <tbody>
        {dataView.length > 0
          ? dataView.map((product, index) => (
              <tr key={index}>
                <td>{get_ms(product, "name")}</td>
                <td>{get_ms(product, "email")}</td>
                {Object.keys(dataView[0])
                  .filter(
                    (field) =>
                      field !== "name" &&
                      field !== "email" &&
                      field !== "events"
                  )
                  .map((field) => (
                    <td key={field}>{get_ms(product, field)}</td>
                  ))}
              </tr>
            ))
          : null}
      </tbody>
    </Table>
  );
}

export default FilteredLeadsTable;
