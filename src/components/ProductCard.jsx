import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  ProductCard.propTypes = {
    product: PropTypes.object,
  };

  return (
    <>
      <div className="group border-t-2 border-[#87A922] hover:scale-110 rounded-t-md shadow-2xl">
        <Link to={`/products/${product._id}`}>
          <div className="w-full h-36 overflow-hidden bg-transparent p-5 bg-[#F7F6BB]">
            <img
              className="w-full h-full object-scale-down group-hover:scale-110 duration-500"
              src="https://freepngimg.com/save/5509-cabbage-png-image/386x350"
            />
          </div>
        <div>
          <div className="bg-[#114232] text-white p-5 rounded-b-md">
            <div className="h-full w-full">
              <div className="sm:truncate text-md font-semibold hover:underline hover:underline-offset-4 hover:scale-y-110">
                {/* {product.name.length >= 10
                  ? `${product.name.substring(0, 10)}...`
                  : product.name} */}
                {product.name}
              </div>
              <div className="text-[#FCDC2A] text-md font-medium">
                ${product.price}
              </div>
            </div>
            <div className="text-[#F7F6BB] py-3 flex flex-row justify-start items-center">
              <div>35 sold</div>
            </div>
            {/* <div className="flex flex-col gap-2">
              <div className="bg-[#87A922] rounded-full p-1 text-center hover:bg-[#FCDC2A] hover:text-[#114232]">
                <button>Add to Cart</button>
              </div>
              <div className="bg-[#87A922] rounded-full p-1 text-center hover:bg-[#FCDC2A] hover:text-[#114232]">
                <Link to={`/products/${product._id}`}>Buy Now</Link>
              </div>
            </div> */}
          </div>
        </div>
        </Link>
      </div>
    </>
  );
}
