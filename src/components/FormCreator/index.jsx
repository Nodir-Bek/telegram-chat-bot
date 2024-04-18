import { PropTypes } from "prop-types";
import Select from "../Select";
import TextArea from "../TextArea";
import Input from "../Input";
import Button from "../Button";
import FileUpload from "../FileUpload";
import PhoneInput from "../PhoneInput";
import { useCallback } from "react";
const FormCreator = ({ form, formik }) => {
  const selecthandler = useCallback(
    (item, val) => {
      if (item?.name === "province") {
        formik.setFieldValue(item?.name, val);
        formik.setFieldValue("region", "");
        formik.setFieldValue("district", "");
      } else if (item.name === "region") {
        formik.setFieldValue(item?.name, val);
        formik.setFieldValue("district", "");
      } else {
        formik.setFieldValue(item?.name, val);
      }
    },
    [formik]
  );

  return (
    <div className="w-full flex h-full min-h-screen flex-col justify-start items-start gap-5">
      {form &&
        form.map((item, index) => (
          <div
            className="w-full flex flex-col justify-start items-start gap-1"
            key={index}
          >
            {item.type === "text" && (
              <Input
                type="text"
                name={item?.name}
                placeholder={item?.placeholder}
                label={item?.label}
                value={formik.values[item?.name]}
                onChange={formik.handleChange}
                disabled={item?.disabled}
                className={
                  formik.touched[item?.name] &&
                  formik.errors[item?.name] &&
                  "form-validation-error"
                }
              />
            )}
            {item?.type === "textarea" && (
              <TextArea
                label={item?.label}
                name={item?.name}
                placeholder={item?.placeholder}
                onChange={formik.handleChange}
                value={formik.values[item?.name]}
                className={
                  formik.touched[item?.name] &&
                  formik.errors[item?.name] &&
                  "form-validation-error"
                }
              />
            )}
            {item?.type === "select" && (
              <Select
                placeholder={item?.placeholder}
                options={item?.options}
                name={item?.name}
                label={item?.label}
                onChange={(val) => selecthandler(item, val)}
                value={formik.values[item?.name]}
                disabled={item?.disabled}
                className={
                  formik.touched[item?.name] &&
                  formik.errors[item?.name] &&
                  "form-validation-error"
                }
              />
            )}
            {item?.type === "phone" && (
              <PhoneInput
                type="phone"
                name={item?.name}
                placeholder={item?.placeholder}
                label={item?.label}
                onChange={formik.handleChange}
                value={formik.values[item?.name]}
                disabled={item?.disabled}
                className={
                  formik.touched[item?.name] &&
                  formik.errors[item?.name] &&
                  "form-validation-error"
                }
              />
            )}
            {item.type === "file" && (
              <FileUpload
                files={formik.values[item.name]}
                onChange={(val) => formik.setFieldValue(item?.name, val)}
              />
            )}
            <span className="text-red-500 text-sm transition-all duration-150 ease-in-out">
              {formik.touched[item?.name] && formik.errors[item?.name]}
            </span>
          </div>
        ))}
      <Button type="button" onClick={formik.handleSubmit}>
        <span className="text-base font-medium leading-4">Yuborish</span>
      </Button>
    </div>
  );
};

FormCreator.propTypes = {
  form: PropTypes.array.isRequired,
  values: PropTypes.object,
  submit: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
};

export default FormCreator;
