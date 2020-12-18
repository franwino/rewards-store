import React, { useState, useEffect } from "react";
import { getProdListFromApi } from "../../scripts/api";
import { Pagination } from "semantic-ui-react";
import usePagination from "../Hooks/usePagination";
import Product from "./Product";
import Filters from "./Filters";
import "./productList.css";

const initProdList = [
  {
    _id: "",
    name: "",
    cost: 0,
    category: "",
    img: {
      url: "",
      hdUrl: "",
    },
  },
];

const initFilters = {
  category: "none",
  sort: "az",
};

export default function ProductList(props) {
  const { availableCoins, localUserData, setLocalUserData } = props;
  // Estado con listado de productos
  const [prodList, setProdList] = useState(initProdList);

  // Listado de productos a mostrar
  const [prodDisplay, setProdDisplay] = useState([]);

  // Filtros y orden
  const [filters, setFilters] = useState(initFilters);
  function handleFilters(e, { value, name }) {
    const stateCopy = { ...filters };
    stateCopy[name] = value;
    setFilters(stateCopy);
  }

  function filterCat(product) {
    return filters.category === "none" || product.category === filters.category;
  }

  function sortProducts(a, b) {
    switch (filters.sort) {
      case "az":
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      case "za":
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      case "low":
        return a.cost - b.cost;
      case "high":
        return b.cost - a.cost;
      default:
        return 0;
    }
  }

  // Modifico filtros/orden cuando se selecciona una opcion
  useEffect(() => {
    const prodFilter = prodList.filter(filterCat);
    prodFilter.sort(sortProducts);
    setProdDisplay(prodFilter);
  }, [filters]);

  //Pagination
  const [page, setPage] = useState(1);
  const PER_PAGE = 16;

  const count = Math.ceil(prodDisplay.length / PER_PAGE);
  const _DATA = usePagination(prodDisplay, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p.activePage);
    _DATA.jump(p.activePage);
  };

  // Traigo los productos al montar el componente
  useEffect(() => {
    getProdListFromApi(setProdList);
    setProdDisplay([...prodList]);
  }, []);

  // Muestro todos los productos cada vez que cambia el listado original
  useEffect(() => {
    setProdDisplay([...prodList]);
  }, [prodList]);

  return (
    <section className="productList">
      <Filters
        prodList={prodList}
        filters={filters}
        handleFilters={handleFilters}
      ></Filters>
      <div className="paginationBar">
        <Pagination
          activePage={page}
          totalPages={count}
          onPageChange={handleChange}
        ></Pagination>
        <p>
          {page < count ? page * PER_PAGE : prodDisplay.length} de{" "}
          {prodDisplay.length} productos
        </p>
      </div>
      <div className="products">
        {_DATA.currentData().map((product) => (
          <Product
            key={product._id}
            availableCoins={availableCoins}
            productData={product}
            localUserData={localUserData}
            setLocalUserData={setLocalUserData}
          ></Product>
        ))}
      </div>
      <div className="paginationBar">
        <Pagination
          activePage={page}
          totalPages={count}
          onPageChange={handleChange}
        ></Pagination>
        <p>
          {page < count ? page * PER_PAGE : prodDisplay.length} de{" "}
          {prodDisplay.length} productos
        </p>
      </div>
    </section>
  );
}
