import StudentView from "./StudentView";
import SupervisorView from "./SupervisorView";

const Announcements = ({ projectInfo, projectsNotifCount }) => {
  return (
    <div className="bg-slate-50 flex font-light text-xs p-2 shadow-lg">
      {projectInfo ? (
        <StudentView projectInfo={projectInfo} />
      ) : projectsNotifCount ? (
        <SupervisorView projectsNotifCount={projectsNotifCount} />
      ) : (
        "خوش آمدید"
      )}
    </div>
  );
};

export default Announcements;
