import React, { useState } from "react";
import { Button, Table, Modal, Pagination } from "semantic-ui-react";
import moment from "moment";
import { getHistory } from "../../scripts/api";
import usePagination from "../../components/Hooks/usePagination";

export default function History() {
  //History data
  const [history, setHistory] = useState([]);

  // Modal state
  const [open, setOpen] = useState(false);

  //Pagination state
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const count = Math.ceil(history.length / PER_PAGE);
  const _DATA = usePagination(history, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p.activePage);
    _DATA.jump(p.activePage);
  };

  return (
    <Modal
      className="history"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button onClick={() => getHistory(setHistory)}>
          Historial de Canjes
        </Button>
      }
    >
      <Modal.Header>Tu historial de canjes</Modal.Header>
      <Modal.Content>
        <Table striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Fecha de Canje</Table.HeaderCell>
              <Table.HeaderCell>Costo</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_DATA.currentData().map((product) => (
              <Table.Row key={product.createDate}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>
                  {moment(product.createDate).format("DD/MM/YYYY")}
                </Table.Cell>
                <Table.Cell>{product.cost}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="history__paginationBar paginationBar">
          <Pagination
            activePage={page}
            totalPages={count}
            onPageChange={handleChange}
            boundaryRange={0}
            ellipsisItem={null}
            firstItem={page !== 1 ? undefined : null}
            prevItem={page !== 1 ? undefined : null}
            lastItem={page !== count ? undefined : null}
            nextItem={page !== count ? undefined : null}
          ></Pagination>
          <p>
            Mostrando canjes {(page - 1) * PER_PAGE + 1} a{" "}
            {page < count ? page * PER_PAGE : history.length} de{" "}
            {history.length}
          </p>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cerrar
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
