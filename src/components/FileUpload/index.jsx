import { FiDownload, FiX } from "react-icons/fi";
import PropTypes from "prop-types";

const FileUpload = ({ files, onChange }) => {
  return (
    <div className="w-full h-11 flex flex-1 justify-start items-center gap-2">
      <label
        htmlFor="file"
        className="h-11 inline-flex justify-center items-center gap-2 cursor-pointer rounded-lg py-2 px-2 border border-[#e8e8e8] text-[#000] font-medium text-[15px] leading-[15px]"
      >
        <FiDownload />{" "}
        <span className="text-[#202020] font-normal text-base leading-4">
          Fayl yuklash
        </span>
        <input
          type="file"
          name="file"
          id="file"
          className="hidden sr-only"
          accept="image/*"
          onChange={(e) => onChange(e.target.files[0])}
        />
      </label>
      {files?.name && (
        <div className="w-min h-full flex justify-start items-center">
          {files?.type?.includes("image") ? (
            <div className="w-11 h-11 relative border border-gray-300 rounded-lg p-1">
              <img
                src={URL.createObjectURL(files)}
                alt="file"
                className="w-full h-full object-contain"
              />
              <span
                onClick={() => onChange({})}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-lg hover:scale-110 transition-all ease-linear cursor-pointer"
              >
                <FiX />
              </span>
            </div>
          ) : (
            <div className="text-[#000] font-medium text-[15px] leading-[15px] relative border border-gray-300 rounded-lg p-2">
              {files?.name}
              <span
                onClick={() => onChange({})}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-lg cursor-pointer hover:scale-110 transition-all ease-linear"
              >
                <FiX />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
FileUpload.propTypes = {
  files: PropTypes.object,
  onChange: PropTypes.func,
};

export default FileUpload;
