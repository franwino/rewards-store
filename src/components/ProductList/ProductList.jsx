import React, { useState, useEffect } from "react";
import { getProdListFromApi } from "../../scripts/api";
import { Pagination } from "semantic-ui-react";
import usePagination from "../Hooks/usePagination";
import Product from "./Product";
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

export default function ProductList(props) {
  const { availableCoins, localUserData, setLocalUserData } = props;
  // Listado de productos
  const [prodList, setProdList] = useState(initProdList);

  //Pagination state
  const [page, setPage] = useState(1);
  const PER_PAGE = 16;

  const count = Math.ceil(prodList.length / PER_PAGE);
  const _DATA = usePagination(prodList, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p.activePage);
    _DATA.jump(p.activePage);
  };

  useEffect(() => {
    getProdListFromApi(setProdList);
  }, []);

  return (
    <section className="productList">
      {_DATA.currentData().map((product) => (
        <Product
          key={product._id}
          availableCoins={availableCoins}
          productData={product}
          localUserData={localUserData}
          setLocalUserData={setLocalUserData}
        ></Product>
      ))}
      <div className="paginationBar">
        <Pagination
          activePage={page}
          totalPages={count}
          onPageChange={handleChange}
        ></Pagination>
        <p>
          {page < count ? page * PER_PAGE : prodList.length} de{" "}
          {prodList.length} productos
        </p>
      </div>
    </section>
  );
}
