import createTdFromObject from "../../../utils/createTdFromObject";
import TableLayout from "../../layouts/TableLayout/TableLayout";
import Modal from "../Modal";
import ProjectStatus from "../../../constants/ProjectStatus";

const Table = ({ headers, data }) => {
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
              {createTdFromObject(item, index, "status", ProjectStatus.free)}
            </tr>
          ))}
        </tbody>
      </table>
    </TableLayout>
  );
};

export default Table;
