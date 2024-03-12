import PropTypes from "prop-types";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Date Ordered",
    selector: (row) => row.orderedOn,
  },
  {
    name: "User Id",
    selector: (row) => row.userId,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  {
    name: "Total Price",
    selector: (row) => row.totalPrice.toFixed(2),
  },
];

export default function OrdersDataTable({ orders }) {
  OrdersDataTable.propTypes = {
    orders: PropTypes.array,
  };

  console.log(orders);

  return (
    <div className="shadow-2xl my-5 mx-12">
      <DataTable
        title={"Orders List"}
        columns={columns}
        data={orders}
        fixedHeader
        fixedHeaderScrollHeight="520px"
        pagination
        responsive
        striped
        subHeader
        subHeaderAlign="left"
      />
    </div>
  );
}
