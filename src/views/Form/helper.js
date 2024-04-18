import * as Yup from "yup";

export const YetakchiSchema = Yup.object().shape({
  phone: Yup.string().required().label("Telefon raqam"),
  province: Yup.string().required().label("Viloyat"),
  region: Yup.string().required().label("Shaxar-tuman"),
  district: Yup.string().required().label("Tuman"),
  file: Yup.object().label("File"),
});
export const OtherSchema = Yup.object().shape({
  lastName: Yup.string().required("Last name is required"),
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string(),
  phone: Yup.string().required("Phone is required"),
  province: Yup.string().required("Province is required"),
  region: Yup.string().required("Region is required"),
  desc: Yup.string().max(700, "Max 500 characters"),
  file: Yup.object().label("File"),
});

export const appsSchema = (
  provinceOption,
  regionOption,
  districtOption,
  projectTitle,
  ourClient = false
) => {
  const body = [
    {
      type: "phone",
      name: "phone",
      label: `${projectTitle ?? "Tanlangan"} tizimiga ulangan telefon raqam:`,
      placeholder: "+998 (95)-123-45-45",
      disabled: ourClient,
      isAllowed: ["https://medkpi.uz", "https://test.e-tahlil.uz"],
    },
    {
      type: "select",
      name: "province",
      label: "Viloyat:",
      placeholder: "Viloyat tanlang!",
      options: provinceOption,
      disabled: ourClient,
      isAllowed: ["https://medkpi.uz", "https://test.e-tahlil.uz"],
    },
    {
      type: "select",
      name: "region",
      label: "Shaxar-tuman:",
      placeholder: "Shaxar-tuman tanlang!",
      options: regionOption,
      disabled: ourClient,
      isAllowed: ["https://medkpi.uz", "https://test.e-tahlil.uz"],
    },
    {
      type: "select",
      name: "district",
      label: "M.F.Y:",
      placeholder: "M.F.Y tanlang!",
      options: districtOption,
      disabled: ourClient,
      isAllowed: ["https://medkpi.uz", "https://test.e-tahlil.uz"],
    },
    {
      type: "textarea",
      name: "desc",
      label: "Muammo mazmuni",
      placeholder: "Muammo mazmunini kiriting!...",
      isAllowed: ["https://medkpi.uz", "https://test.e-tahlil.uz"],
    },
    {
      type: "file",
      name: "file",
      label: "",
      placeholder: "",
      isAllowed: ["https://medkpi.uz", "https://test.e-tahlil.uz"],
    },
  ];
  return body;
};

export const otherSchema = (provinceOption, regionOption) => {
  const body = [
    {
      type: "text",
      name: "lastName",
      label: "Familiya:",
      placeholder: "Familiyangizni kiriting!",
    },
    {
      type: "text",
      name: "firstName",
      label: "Ism:",
      placeholder: "Ismingizni kiriting!",
    },
    {
      type: "text",
      name: "middleName",
      label: "Sharif:",
      placeholder: "Sharifingizni kiriting!",
    },
    {
      type: "phone",
      name: "phone",
      label: "Tizimdagi telefon raqamingiz:",
      placeholder: "+998 (95)-123-45-45",
    },
    {
      type: "text",
      name: "province",
      label: "Viloyat:",
      placeholder: "Viloyat nomini kiriting!",
      options: provinceOption,
    },
    {
      type: "text",
      name: "region",
      label: "Shaxar-tuman:",
      placeholder: "Shaxar-tuman nomini kiriting!",
      options: regionOption,
    },

    {
      type: "textarea",
      name: "desc",
      label: "Muammo mazmuni",
      placeholder: "Muammo mazmunini kiriting!...",
    },
    {
      type: "file",
      name: "file",
      label: "",
      placeholder: "",
    },
  ];
  return body;
};
