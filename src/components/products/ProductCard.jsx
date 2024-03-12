import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

export default function ProductCard({ product }) {
  ProductCard.propTypes = {
    product: PropTypes.object,
  };

  return (
    <>
      <div className="group border-y-2 border-[#9BCF53] hover:scale-110 shadow-2xl bg-[#FBF6EE]">
        <Link to={`/products/${product._id}`}>
          <div className="w-full h-36 overflow-hidden bg-transparent p-5 bg-[#FFFFFF]">
            <img alt=""
              className="w-full h-full object-scale-down group-hover:scale-110 duration-500"
              src="https://freepngimg.com/save/10194-carrot-png/1000x901"
            />
          </div>
          <div>
            <div className="bg-[#F2F1EB] text-[#114232] p-5 rounded-b-md">
              <div className="h-full w-full">
                <div className="sm:truncate text-md font-semibold hover:underline hover:underline-offset-4 hover:scale-y-110">
                  {/* {product.name.length >= 10
                  ? `${product.name.substring(0, 10)}...`
                  : product.name} */}
                  {product.name}
                </div>
                <div className="text-[#114232] text-md font-medium">
                  <NumericFormat
                    value={product.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                  />
                </div>
              </div>
              <div className="text-[#FF8E00] py-3 flex flex-row justify-start items-center">
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
