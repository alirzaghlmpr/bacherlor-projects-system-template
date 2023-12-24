import { useState } from "react";
import ProjectsTableHeaders from "../constants/ProjectsTableHeaders";
import ProjectsTable from "../components/templates/ProjectsTable/ProjectsTable";

import Header from "../components/templates/Header";
import SupervisorNavbar from "../constants/SupervisorNavbar";

import Announcements from "../components/templates/Announcements";
import SuperVisorProjectsMockInfo from "../mocks/SuperVisorProjectsMockInfo";
import PageStatus from "../constants/PageStatus";
import sendNotif from "../utils/sendNotif";
import NotifMessages from "../constants/NotifMessages";
import checkEmptyOrNull from "../utils/checkEmptyOrNull";
import {
  AddProjectFormFields,
  AddProjectFormKeys,
} from "../constants/AddProjectFormFields";
import Spinner from "../components/shared/Spinner";

const AddProject = () => {
  const [data, setData] = useState({ status: PageStatus.Init, data: null });
  const [inputErrors, setInputErrors] = useState({
    title: false,
    capacity: false,
  });

  const requestAddProject = async (title, capacity) => {
    sendNotif(
      NotifMessages?.Project?.SuccessAdd?.text,
      NotifMessages?.Project?.SuccessAdd?.type
    );
    setData({
      status: PageStatus.Loading,
      data: { title: title, capacity: capacity },
    });
    console.log(`title:${title} , capacity:${capacity}`);
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
      <Announcements projectsNotifCount="1" />
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
          data: SuperVisorProjectsMockInfo,
        }}
        requestable={false}
      />
    </>
  );
};

export default AddProject;
