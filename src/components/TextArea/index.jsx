import PropTypes from "prop-types";
const TextArea = ({ placeholder, label, type, value, name, id, onChange }) => {
  return (
    <div className="w-full flex flex-1 flex-col justify-start items-start gap-2">
      <span className="text-[#000] font-medium text-[15px] leading-[15px]">
        {label}
      </span>
      <textarea
        className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2 focus:outline-none"
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
    </div>
  );
};
TextArea.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default TextArea;
