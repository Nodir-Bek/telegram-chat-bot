import PropTypes from "prop-types";
import { PiSpinner } from "react-icons/pi";

const Button = ({ children, onClick, loading, type }) => {
  return (
    <button
      type={type}
      className={`h-11 w-min button ${
        loading ? "cursor-default pointer-events-none bg-[#0366FF]/[0.8] " : ""
      } bg-[#0366FF] text-white rounded-lg px-5 py-3 hover:bg-[#0366FF]/[0.8] cursor-pointer inline-flex justify-center items-center gap-4 transition-all ease-linear`}
      onClick={onClick}
    >
      {children}{" "}
      {loading && (
        <span className="inline-flex justify-center items-center transition-all text-white animate-spin">
          <PiSpinner />
        </span>
      )}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  type: PropTypes.string,
};
export default Button;
