import React, { useState, useEffect } from "react";
import { getProdListFromApi } from "../../services/api";
import { Pagination } from "semantic-ui-react";
import usePagination from "../Hooks/usePagination";
import Product from "./Product/Product";
import Filters from "./Filters";
import "./styles/productList.css";

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
    const aName = a.name.toLowerCase();
    const bNAme = b.name.toLowerCase();
    const aCost = a.cost;
    const bCost = b.cost;
    switch (filters.sort) {
      case "fromAtoZ":
        if (aName > bNAme) {
          return 1;
        }
        if (aName < bNAme) {
          return -1;
        }
        return 0;
      case "fromZtoA":
        if (aName < bNAme) {
          return 1;
        }
        if (aName > bNAme) {
          return -1;
        }
        return 0;
      case "low":
        return aCost - bCost;
      case "high":
        return bCost - aCost;
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
  const prodDisplayPaginated = usePagination(prodDisplay, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p.activePage);
    prodDisplayPaginated.jump(p.activePage);
  };

  return (
    <main className="productList">
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
      <section className="products">
        {prodDisplayPaginated.currentData().map((product) => (
          <Product
            key={product._id}
            availableCoins={availableCoins}
            productData={product}
            localUserData={localUserData}
            setLocalUserData={setLocalUserData}
          ></Product>
        ))}
      </section>
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
    </main>
  );
}
