import ExclamationMark from "../../../../assets/icons/exclamation-mark.png";
const StudentView = ({ projectInfo }) => {
  return (
    <>
      {projectInfo ? (
        <p>
          <span>
            <img
              src={ExclamationMark}
              style={{ display: "inline" }}
              width="30"
              alt=""
            />
          </span>
          <span className="font-medium">عنوان پروژه اخذ شده : </span>
          <span className="font-normal">{projectInfo?.title}</span>
          <span> ، </span>
          <span className="font-medium">استاد راهنما : </span>
          <span className="font-normal">{projectInfo?.supervisor}</span>
          <span> ، </span>
          <span className="font-medium">هم پروژه ای های شما : </span>
          <span className="font-normal">
            {projectInfo?.members.map(({ name }) => (
              <span className="mx-1">{name} </span>
            ))}
          </span>
        </p>
      ) : (
        <p>شما پروژه ای اخذ نکرده اید</p>
      )}
    </>
  );
};

export default StudentView;
