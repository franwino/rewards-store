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

  // Traigo los productos al montar el componente
  useEffect(() => {
    getProdListFromApi(setProdList);
    setProdDisplay([...prodList]);
  }, []);

  // Muestro todos los productos cada vez que cambia el listado original
  useEffect(() => {
    setProdDisplay([...prodList]);
    filterOrder();
  }, [prodList]);

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
    const an = a.name.toLowerCase();
    const bn = b.name.toLowerCase();
    const ac = a.cost;
    const bc = b.cost;
    switch (filters.sort) {
      case "az":
        if (an > bn) {
          return 1;
        }
        if (an < bn) {
          return -1;
        }
        return 0;
      case "za":
        if (an < bn) {
          return 1;
        }
        if (an > bn) {
          return -1;
        }
        return 0;
      case "low":
        return ac - bc;
      case "high":
        return bc - ac;
      default:
        return 0;
    }
  }

  // Modifico filtros/orden cuando se selecciona una opcion
  function filterOrder() {
    const prodFilter = prodList.filter(filterCat);
    prodFilter.sort(sortProducts);
    setProdDisplay(prodFilter);
  }
  useEffect(() => {
    filterOrder();
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
          firstItem={page !== 1 ? undefined : null}
          prevItem={page !== 1 ? undefined : null}
          lastItem={page !== count ? undefined : null}
          nextItem={page !== count ? undefined : null}
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
          firstItem={page !== 1 ? undefined : null}
          prevItem={page !== 1 ? undefined : null}
          lastItem={page !== count ? undefined : null}
          nextItem={page !== count ? undefined : null}
        ></Pagination>
        <p>
          {page < count ? page * PER_PAGE : prodDisplay.length} de{" "}
          {prodDisplay.length} productos
        </p>
      </div>
    </section>
  );
}
