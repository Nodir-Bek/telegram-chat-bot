import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import telegramBot from "../../services/telegramBot";
// import { useState } from "react";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // Get specific query parameters
  const phoneNumber = searchParams.get("phoneNumber");
  const chatId = searchParams.get("chatId");
  const clientId = searchParams.get("clientId");
  const [data, setData] = useState([]);

  useEffect(() => {
    telegramBot.getAllProjects().then((res) => {
      setData(res);
    });
  }, [chatId, phoneNumber, clientId]);

  useEffect(() => {
    const handleNavigation = (event) => {
      if (event.state && event.state.closeWindow) {
        window.close();
      }
    };
    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  const handleNavigate = (projectId, projectTitle, projectUrl) => {
    if (projectId === "other") {
      navigate("/message/other", {
        state: {
          chatId,
          phoneNumber,
          clientId,
          projectUrl: "other",
        },
      });
    } else {
      navigate(`/message/${projectId}`, {
        state: {
          chatId,
          phoneNumber,
          clientId,
          projectTitle,
          projectUrl,
        },
      });
    }
  };

  return (
    <div className="w-full flex flex-1 flex-col justify-start items-start gap-3">
      <div>
        <h2 className="text-[#000] font-semibold text-xl leading-5">
          Kerakli dasturni tanlang
        </h2>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-[10px] mt-5">
        {data?.map((app) => (
          <Fragment key={app?._id}>
            {!app.other && (
              <button
                key={app?.title}
                onClick={() => handleNavigate(app?._id, app?.title, app?.url)}
                className="w-full flex justify-start items-center gap-2 text-[#202020] font-medium text-[15px] leading-[15px] rounded-[50px] bg-[#F2F2F2] p-1 pr-2"
              >
                <span className="w-10 h-10 p-2 rounded-full bg-white inline-flex justify-center items-center">
                  <img
                    className="object-contain rounded-full w-full h-full"
                    src={`${app.logo}`}
                    alt={app?.title}
                    crossOrigin="anonymous"
                  />
                </span>
                <span className="text-left w-min">{app?.title}</span>
              </button>
            )}
          </Fragment>
        ))}
      </div>
      <div className="w-full">
        <button
          onClick={() => handleNavigate("other")}
          className="w-full bg-[#0366FF]/[0.10] text-[#1B2559] font-medium leading-[18px] text-[15px] rounded-[50px] py-3 text-center px-4"
        >
          Boshqa masala
        </button>
      </div>
    </div>
  );
}

export default Main;
