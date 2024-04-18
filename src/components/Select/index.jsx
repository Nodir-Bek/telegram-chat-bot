import { memo, useEffect, useRef, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import PropTypes from "prop-types";

const Select = ({
  options = [],
  value = "",
  onChange,
  label,
  placeholder,
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const setCurrentValue = (value) => {
    const option = options.find((option) => option._id === value);
    if (option) {
      return option.title;
    }
    return "";
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full  flex flex-1 flex-col justify-start items-start gap-2">
      <span className="text-[#000] font-medium text-[15px] leading-[15px]">
        {label}
      </span>
      <div ref={ref} className="w-full h-full  bg-white relative">
        <div
          type="text"
          className={`${className} w-full ${
            disabled ? "bg-[#F5F5F5]" : "bg-white"
          } border border-gray-300 min-h-11 rounded-lg px-4 py-2 focus:outline-none ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => toggleDropdown()}
        >
          <span>{value && setCurrentValue(value)}</span>{" "}
          <span className="text-black/[0.4]">{!value && placeholder}</span>
          <span className="absolute right-5 top-0 h-full flex justify-center items-center">
            {isOpen ? <FaSortUp className="-mb-1" /> : <FaSortDown />}
          </span>
        </div>
        <div
          className={`w-full max-h-52 flex flex-col justify-start items-start gap-1 bg-white border shadow-md border-gray-300 rounded-b-lg py-1 ${
            isOpen ? "block" : "hidden"
          } absolute z-[50000] transition-all duration-200 ease-linear overflow-auto`}
        >
          {options?.length > 0 ? (
            options?.map((item) => (
              <button
                key={item?._id}
                onClick={() => {
                  onChange(item?._id);
                  setIsOpen(false);
                }}
                className={`${
                  item?._id === value ? "bg-blue-500 text-white" : ""
                } w-full text-left hover:bg-blue-500 hover:text-white transition-colors ease-linear cursor-pointer rounded-lg px-4 py-2`}
              >
                {item?.title}
              </button>
            ))
          ) : (
            <div className="w-full px-4 text-black/[0.6]">Empty list</div>
          )}
        </div>
      </div>
    </div>
  );
};
Select.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
const MemoizedComponent = memo(Select);
export default MemoizedComponent;
