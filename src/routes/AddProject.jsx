import { useState } from "react";
import ProjectsTableHeaders from "../constants/ProjectsTableHeaders";
import ProjectsTable from "../components/templates/ProjectsTable/ProjectsTable";

import Header from "../components/templates/Header";
import SupervisorNavbar from "../constants/SupervisorNavbar";

import PageStatus from "../constants/PageStatus";
import sendNotif from "../utils/sendNotif";
import NotifMessages from "../constants/NotifMessages";
import checkEmptyOrNull from "../utils/checkEmptyOrNull";
import {
  AddProjectFormFields,
  AddProjectFormKeys,
} from "../constants/AddProjectFormFields";
import Spinner from "../components/shared/Spinner";

import { useNavigate } from "react-router";
import useUserStore from "../store/useUserStore";
import { useEffect } from "react";
import { getProfessorProjects } from "../apis";
import axios from "axios";
import ProjectStatus from "../constants/ProjectStatus";
import { createProject } from "../apis";

const AddProject = () => {
  const navigate = useNavigate();

  const { localStorageKey, token } = useUserStore((state) => ({
    localStorageKey: state?.localStorageKey,
    token: state?.token,
  }));

  useEffect(() => {
    const getData = async (token) => {
      try {
        setData({
          data: null,
          status: PageStatus.Loading,
        });

        let result = await axios.get(getProfessorProjects(), {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(result.data.length);

        if (result?.data.length == 0)
          setData({ status: PageStatus.Fetched, data: null });
        else {
          setData({
            data: result.data.map(({ project }) => ({
              title: project.title,
              supervisor: project.professor_name,
              capacity: project.max_students,
              status: !project.is_available
                ? ProjectStatus.full
                : ProjectStatus.free,
              id: project.project_id,
            })),
            status: PageStatus.Fetched,
          });
        }
      } catch (e) {
        if (e.response.status === 401) {
          navigate("/login");
          sendNotif(
            NotifMessages.Login.NoToken.text,
            NotifMessages.Login.NoToken.type
          );
        }
        setData({
          data: null,
          status: PageStatus.Error,
        });
      }
    };

    const localStorageData = localStorage.getItem(localStorageKey);
    if (localStorageData) {
      const { role, token } = JSON.parse(localStorageData);
      role !== "professor" && navigate("/access-denied");
      getData(token);
    } else {
      navigate("/login");
      sendNotif(
        NotifMessages.Login.NoToken.text,
        NotifMessages.Login.NoToken.type
      );
    }
  }, []);

  const [data, setData] = useState({ status: PageStatus.Init, data: null });
  const [inputErrors, setInputErrors] = useState({
    title: false,
    capacity: false,
  });

  const requestAddProject = async (title, capacity) => {
    try {
      setData({ status: PageStatus.Loading, data: null });
      let result = await axios.post(
        createProject(),
        { name: title, capacity: parseInt(capacity) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      sendNotif(
        NotifMessages.Project.SuccessAdd.text,
        NotifMessages.Project.SuccessAdd.type
      );
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (e) {
      sendNotif(
        NotifMessages.Project.FailedAdd.text,
        NotifMessages.Project.FailedAdd.type
      );
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formElements = e.target?.elements;

    let title = formElements[AddProjectFormFields.title.key]?.value;
    let capacity = formElements[AddProjectFormFields.capacity.key]?.value;

    let titleStatus = checkEmptyOrNull(title);
    let capacityStatus = checkEmptyOrNull(capacity);

    setInputErrors({
      title: titleStatus,
      capacity: capacityStatus,
    });

    if (titleStatus || capacityStatus) return;
    else await requestAddProject(title, capacity);
  };

  return (
    <>
      <Header navbar={SupervisorNavbar} />
      {data.status === PageStatus.Loading && (
        <Spinner text="درحال بارگزاری..." size="75" color="#000" />
      )}
      {data.status == PageStatus.Error && (
        <p className="text-center my-5">
          <span>خطایی رخ داد دوباره تلاش کنید.</span>
          <br />
          <span
            onClick={() => location.reload()}
            className="underline cursor-pointer">
            بارگیری مجدد صفحه
          </span>
        </p>
      )}

      {!data.data && data.status == PageStatus.Fetched && (
        <p>شما پروژه ای ثبت نکرده اید</p>
      )}

      {data.data && (
        <>
          <form
            autoComplete="on"
            onSubmit={handleFormSubmit}
            className="flex flex-col my-5 justify-start items-start gap-5 p-4">
            {AddProjectFormKeys.map((key) => (
              <div className="md:w-[40%] w-[100%]" key={key}>
                <label
                  htmlFor={AddProjectFormFields[key].key}
                  className="block mb-2 text-sm text-slate-700">
                  {AddProjectFormFields[key].label}
                </label>
                <input
                  name={AddProjectFormFields[key].key}
                  id={AddProjectFormFields[key].key}
                  autoComplete={AddProjectFormFields[key].autoComplete}
                  type={AddProjectFormFields[key].type}
                  min={AddProjectFormFields[key]?.min}
                  className={`outline-none bg-slate-200 rounded-lg w-[100%] p-2 focus:bg-slate-100 focus:${
                    inputErrors[key] === true
                      ? "border-red-600"
                      : "border-slate-800"
                  } border-2 ${
                    inputErrors[key] === true
                      ? "border-red-600"
                      : "border-transparent"
                  }`}
                />
                {inputErrors[key] && (
                  <span className="text-xs text-red-600">
                    {AddProjectFormFields[key].error}
                  </span>
                )}
              </div>
            ))}

            <button
              type="submit"
              className={`bg-slate-500 text-slate-50 border-none outline-none rounded-lg items-center flex justify-center px-6 py-3 gap-2 text-sm md:w-[40%] w-[100%]`}>
              <span>
                {data.status === PageStatus.Loading
                  ? "درحال افزودن پروژه..."
                  : "افزودن پروژه"}
              </span>
              {data.status === PageStatus.Loading ? (
                <Spinner color="#fff" size="20px" />
              ) : (
                ""
              )}
            </button>
          </form>
          <ProjectsTable
            info={{
              headers: ProjectsTableHeaders,
              data: data.data,
            }}
            requestable={false}
          />
        </>
      )}
    </>
  );
};

export default AddProject;
