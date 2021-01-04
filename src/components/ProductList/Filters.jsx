import React from "react";
import { Dropdown } from "semantic-ui-react";

export default function Filters(props) {
  const { prodList, filters, handleFilters } = props;

  // Genero un array de categorias
  const categories = [...new Set(prodList.map((prod) => prod.category))].sort();
  const categoryOptions = categories.map((category) => ({
    key: category,
    value: category,
    text: category,
  }));
  categoryOptions.unshift({
    key: "none",
    value: "none",
    text: "Todas las Categorías",
  });

  // Genero un array de opciones para ordenar
  const sortOptions = [
    { key: "fromAtoZ", value: "fromAtoZ", text: "De la A a la Z" },
    { key: "fromZtoA", value: "fromZtoA", text: "De la Z a la A" },
    { key: "low", value: "low", text: "Más baratos primero" },
    { key: "high", value: "high", text: "Más caros primero" },
  ];
  return (
    <section className="filterList">
      <Dropdown
        selection
        name="category"
        placeholder="Elegir categorías"
        options={categoryOptions}
        onChange={handleFilters}
        value={filters.category}
      ></Dropdown>
      <Dropdown
        selection
        name="sort"
        placeholder="Ordenar por..."
        options={sortOptions}
        onChange={handleFilters}
        value={filters.sort}
      ></Dropdown>
    </section>
  );
}
