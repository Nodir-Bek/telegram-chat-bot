import PropTypes from "prop-types";
const Input = ({
  type,
  value,
  name,
  id,
  onChange,
  label,
  placeholder,
  disabled,
  className,
}) => {
  return (
    <div className="w-full h-11 flex flex-1 flex-col justify-start items-start gap-2">
      <span className="text-[#000] font-medium text-[15px] leading-[15px]">
        {label}
      </span>
      <input
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
Input.propTypes = {
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
export default Input;
