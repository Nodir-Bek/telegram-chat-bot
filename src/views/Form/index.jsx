import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import FormCreator from "../../components/FormCreator";
import { OtherSchema, YetakchiSchema, appsSchema, otherSchema } from "./helper";
import telegramBot from "../../services/telegramBot";
import CustomSpinner from "../../components/Spinner";
import { formatPhoneNumber } from "../../utils/phoneFormatter";
const tg = window?.Telegram?.WebApp;

function Form() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chatId, phoneNumber, clientId } = state;
  const [ourClient, setOurClient] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  // bu yerga murojaat qilishda ishlatigan formani yupda validation uchun schenmani qo'shish uchun project url kerak
  const validationSchemas = {
    "https://test.e-tahlil.uz": YetakchiSchema,
    other: OtherSchema,
  };

  const initialValues = useMemo(() => {
    let schema = [];
    if (projectId === "other") {
      schema = otherSchema(provinces, regions);
    } else {
      schema = appsSchema(
        provinces,
        regions,
        districts,
        state?.projectTitle,
        ourClient
      );
    }
    return schema.reduce((acc, el) => {
      if (el.type === "file") return { ...acc, [el.name]: {} };
      return { ...acc, [el.name]: "" };
    }, {});
  }, [
    projectId,
    provinces,
    regions,
    districts,
    state?.projectTitle,
    ourClient,
  ]);

  const onSubmit = useCallback(
    async (values) => {
      let province, region, district;
      setLoading(true);
      const formattedPhone = values?.phone.replace(/\D/g, "").slice(3); // for phone number 99899123457 => to => 99 1234567
      values.phone = formattedPhone;
      const formData = new FormData();
      if (projectId === "other") {
        province = { title: values.province };
        region = { title: values.region };
        district = { title: values.district };
      }
      if (projectId !== "other") {
        province = provinces.find((p) => p._id === values.province);
        region = regions.find((r) => r._id === values.region);
        district = districts.find((d) => d._id === values.district);
      }
      formData.append("project", projectId);
      formData.append("ourClient", ourClient);
      formData.append("clientId", clientId);
      formData.append("chatId", chatId);
      formData.append("phoneNumber", phoneNumber);

      Object.keys(values)
        .filter((key) => key && key !== "_id" && key !== "avatar")
        .forEach((key) => {
          switch (key) {
            case "province":
              formData.append(key, JSON.stringify(province));
              break;
            case "region":
              formData.append(key, JSON.stringify(region));
              break;
            case "district":
              formData.append(key, JSON.stringify(district));
              break;
            default:
              formData.append(key, values[key]);
          }
        });

      try {
        const resp = await telegramBot.createOrder(formData);
        if (Object.keys(resp).length) {
          tg.close();
          formik.resetForm();
          navigate("/", { state: { closeWindow: true } });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [
      chatId,
      clientId,
      districts,
      navigate,
      ourClient,
      phoneNumber,
      projectId,
      provinces,
      regions,
      tg,
    ]
  );

  useEffect(() => {
    if (window && tg) {
      tg.onEvent("mainButtonClicked", onSubmit);
      return () => {
        tg.offEvent("mainButtonClicked", onSubmit);
      };
    }
  }, [onSubmit]);

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      firstName: "",
      lastName: "",
      middleName: "",
    },
    validationSchema: validationSchemas[state.projectUrl],
    onSubmit,
  });
  const fetchCreditionals = async () => {
    setLoading(true);
    try {
      const requestBody = { project: projectId, phone: phoneNumber };
      // const requestBody = { project: projectId, phone: state?.phoneNumber };
      if (projectId !== "other") {
        const resp = await telegramBot.getCreditionals(requestBody);
        if (resp?.user) {
          setOurClient(!!resp?.user);
          setProvinces(resp?.user?.province ? [resp?.user?.province] : []);
          setRegions(resp?.user?.region ? [resp?.user?.region] : []);
          setDistricts(resp?.user?.district ? [resp?.user?.district] : []);
          formik.setValues(
            resp?.user
              ? {
                  ...resp?.user,
                  province: resp?.user.province?._id,
                  region: resp?.user.region?._id,
                  district: resp?.user.district?._id,
                  phone: formatPhoneNumber(resp?.user.phone),
                }
              : {}
          );
        } else {
          setProvinces(() => resp?.province);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreditionals();
  }, []);

  useEffect(() => {
    if (projectId !== "other") {
      let requestBody = { project: projectId };
      if (formik.values.province && !ourClient && !formik.values.region) {
        requestBody["province"] = formik.values.province;
        telegramBot
          .getRegionsByProvinceId(requestBody)
          .then((res) => {
            setRegions(res);
          })
          .catch((err) => console.error(err))
          .finally(() => (requestBody = {}));
      }
      if (formik.values.region && !ourClient) {
        requestBody["region"] = formik.values.region;
        telegramBot
          .getDistrictsByRegionId(requestBody)
          .then((res) => {
            setDistricts(res);
          })
          .catch((err) => console.error(err))
          .finally(() => (requestBody = {}));
      }
    }
  }, [formik.values.province, formik.values.region, projectId, ourClient]);

  const formSchema = useMemo(() => {
    if (projectId === "other") {
      return otherSchema(provinces, regions);
    }
    const schema = appsSchema(
      provinces,
      regions,
      districts,
      state?.projectTitle,
      ourClient
    ).filter((el) => el.isAllowed.includes(state?.projectUrl));
    return schema;
  }, [
    districts,
    ourClient,
    projectId,
    provinces,
    regions,
    state?.projectTitle,
    state?.projectUrl,
  ]);
  if (loading) return <CustomSpinner color="green" />;
  return (
    <div className="w-full min-h-screen h-full max-w-sm mx-auto flex flex-col justify-start items-center gap-7">
      <h1
        className="text-[#000] font-semibold 
      text-xl leading-5 w-full text-left"
      >
        Muammoni yuborish
      </h1>
      <FormCreator form={formSchema} formik={formik} submit={onSubmit} />
    </div>
  );
}

export default Form;
