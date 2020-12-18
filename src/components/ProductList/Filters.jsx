import React from "react";
import { Select } from "semantic-ui-react";

export default function Filters(props) {
  const { prodList, setFilters } = props;
  const categories = [...new Set(prodList.map((prod) => prod.category))].sort();
  const categoryOptions = categories.map((category) => [
    { key: category, value: category, text: category },
  ]);

  const priceOptions = [
    { key: "none", value: "none", text: "Orden Predeterminado" },
    { key: "low", value: "low", text: "Más baratos primero" },
    { key: "high", value: "high", text: "Más caros primero" },
  ];
  return (
    <section className="filterList">
      <Select options={categoryOptions}></Select>
      <Select options={priceOptions}></Select>
    </section>
  );
}
