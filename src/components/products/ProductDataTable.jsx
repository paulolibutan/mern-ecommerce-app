import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { NumericFormat } from "react-number-format";

import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";

const FilterComponent = ({
  filterText,
  onFilter,
  onClear,
  retrieveProducts,
}) => (
  <div className="flex flex-row w-full justify-between items-center">
    <div className="flex flex-row justify-center items-center rounded-full">
      <div className="me-2">
        <input
          type="text"
          className="border py-2 px-5 rounded-md focus:outline-none w-full text-sm"
          placeholder="Search for products..."
          value={filterText}
          onChange={onFilter}
        />
      </div>
      <div>
        <button
          onClick={onClear}
          className="bg-[#87A922] text-sm hover:bg-[#114232] hover:font-medium px-3 py-2 rounded-md text-white"
        >
          Clear
        </button>
      </div>
    </div>
    <div className="px-10">
      <AddProduct retrieveProducts={retrieveProducts} />
    </div>
  </div>
);

FilterComponent.propTypes = {
  filterText: PropTypes.string,
  onFilter: PropTypes.func,
  onClear: PropTypes.func,
  retrieveProducts: PropTypes.func,
};

export default function ProductDataTable({ products, retrieveProducts }) {
  ProductDataTable.propTypes = {
    products: PropTypes.array,
    retrieveProducts: PropTypes.func,
  };

  const title = (
    <div className="text-2xl font-bold text-center mt-5">Products List</div>
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => {
        return (
          <NumericFormat
            value={row.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
          />
        );
      },
      sortable: true,
      center: true,
    },
    {
      name: "Availability",
      selector: (row) => {
        return (
          <div>
            {row.isActive ? (
              <div className="flex flex-row min-w-24">
                <div className="flex flex-row bg-green-200 text-green-700 py-1 px-3 rounded-md w-full justify-center">
                  Available
                </div>
              </div>
            ) : (
              <div className="flex flex-row min-w-24">
                <div className="flex flex-row bg-red-200 text-red-700 py-1 px-3 rounded-md w-full justify-center">
                  Unavailable
                </div>
              </div>
            )}
          </div>
        );
      },
      center: true,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div className="flex flex-row w-full h-full justify-center items-center">
            <EditProduct product={row} retrieveProducts={retrieveProducts} />
            <ArchiveProduct product={row} retrieveProducts={retrieveProducts} />
          </div>
        );
      },
      center: true,
    },
  ];

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = products.filter(
    (product) =>
      product.name &&
      product.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        retrieveProducts={retrieveProducts}
      />
    );
  }, [filterText, resetPaginationToggle, retrieveProducts]);

  return (
    <div className="shadow-2xl my-5 mx-12">
      <DataTable
        title={title}
        columns={columns}
        data={filteredItems}
        fixedHeader
        fixedHeaderScrollHeight="520px"
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        responsive
        striped
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={subHeaderComponentMemo}
      />
    </div>
  );
}
