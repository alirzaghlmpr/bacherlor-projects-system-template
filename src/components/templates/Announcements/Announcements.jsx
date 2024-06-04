import StudentView from "./StudentView";
import SupervisorView from "./SupervisorView";
import ExclamationMark from "../../../assets/icons/exclamation-mark.png";

const Announcements = ({ projectInfo, projectsNotifCount, text = "" }) => {
  return (
    <div className="bg-slate-50 flex font-light text-xs p-2 shadow-lg">
      {projectInfo ? (
        <StudentView projectInfo={projectInfo} />
      ) : projectsNotifCount ? (
        <SupervisorView projectsNotifCount={projectsNotifCount} />
      ) : (
        <p className="font-bold">
          <span>
            <img
              src={ExclamationMark}
              style={{ display: "inline" }}
              width="30"
              alt=""
            />
          </span>
          <span>{text}</span>
        </p>
      )}
    </div>
  );
};

export default Announcements;
