import { useMask } from "@react-input/mask";
import PropTypes from "prop-types";
const PhoneInput = ({
  type,
  value = "",
  name,
  id,
  onChange,
  label,
  placeholder,
  disabled,
  className,
}) => {
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    defaultValue: "+998 ( ) ___-__-__", // Add a space after +998
    replacement: { _: /\d/ },
    showMask: true,
  });
  return (
    <div className="w-full h-11 flex flex-1 flex-col justify-start items-start gap-2">
      <span className="text-[#000] font-medium text-[15px] leading-[15px]">
        {label}
      </span>
      <input
        ref={inputRef}
        className={`${className} w-full border border-[#E5E5E5] rounded-lg px-4 py-2 focus:outline-none`}
        type={type}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

PhoneInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
export default PhoneInput;
