import ExclamationMark from "../../../../assets/icons/exclamation-mark.png";

const SupervisorView = ({ projectsNotifCount }) => {
  return (
    <>
      {projectsNotifCount && (
        <p>
          <span>
            <img
              src={ExclamationMark}
              style={{ display: "inline" }}
              width="25"
              alt=""
            />
          </span>
          <span className="font-normal">شما </span>
          {projectsNotifCount == 0 ? (
            <span className="font-normal">درخواست پروژه ای ندارید!</span>
          ) : (
            <>
              <span className="font-medium px-1 underline">
                {projectsNotifCount}
              </span>
              <span className="font-normal">
                درخواست پروژه درحال بررسی دارید.
              </span>
            </>
          )}
        </p>
      )}
    </>
  );
};

export default SupervisorView;
