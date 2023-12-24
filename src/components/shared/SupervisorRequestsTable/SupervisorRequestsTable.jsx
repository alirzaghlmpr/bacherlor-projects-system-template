import createTdFromObject from "../../../utils/createTdFromObject";
import TableLayout from "../../layouts/TableLayout/TableLayout";

import ProjectRequestStatus from "../../../constants/ProjectRequestStatus";
import UpdateProjectRequest from "../../../constants/UpdateProjectRequest";
import SupervisorRequestModal from "../SupervisorRequestModal/SupervisorRequestModal";

const SupervisorRequestsTable = ({ headers, data, handleModalAccept }) => {
  return (
    <TableLayout>
      <table className="min-w-full text-sm font-light">
        <thead className="border-b dark:border-neutral-500 font-bold text-slate-50 bg-slate-500">
          <tr className="text-center">
            {headers.map((item) => (
              <th key={item} scope="col" className="px-6 py-4">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b dark:border-neutral-500 text-center ${
                index % 2 === 1 ? "bg-slate-100" : ""
              }`}>
              {createTdFromObject(
                item,
                index,
                "status",
                ProjectRequestStatus.pending,
                handleModalAccept ? (
                  <SupervisorRequestModal
                    buttonContent={"تغییر وضعیت"}
                    header={UpdateProjectRequest?.header}
                    content={UpdateProjectRequest?.content}
                    changeHandeler={handleModalAccept}
                    id={item.id}
                    participants={item.participants}
                  />
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </TableLayout>
  );
};

export default SupervisorRequestsTable;
