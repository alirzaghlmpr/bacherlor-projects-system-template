import StudentView from "./StudentView";
import SupervisorView from "./SupervisorView";

const Announcements = ({ projectInfo }) => {
  return (
    <div className="bg-slate-50 flex font-light text-xs p-2 shadow-lg">
      <StudentView projectInfo={projectInfo} />
      {/* <SupervisorView projectsNotifCount={"0"} /> */}
    </div>
  );
};

export default Announcements;
