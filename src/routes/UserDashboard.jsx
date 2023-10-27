import ProjectsTableHeaders from "../constants/ProjectsTableHeaders";
import TableMockData from "../mocks/TableMockData";
import ProjectsTable from "../components/templates/ProjectsTable/ProjectsTable";
import {
  FormRadioFilters,
  FormRadioFiltersKeys,
  RadiosFiltersName,
} from "../constants/FormRadioFilters";
import ProjectsSelectOptions from "../constants/ProjectsSelectOptions";
import Radio from "../components/shared/Radio/Radio";
import Select from "../components/shared/Select/Select";
import Number from "../components/shared/Number/Number";

const UserDashboard = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let formsElements = e.target?.elements;
    console.log(formsElements[RadiosFiltersName]?.value);
  };
  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex justify-center items-center gap-5 my-3">
        <div className="flex">
          {FormRadioFiltersKeys.map((key) => (
            <div
              key={FormRadioFilters[key]?.key}
              className="inline-flex items-center">
              <Radio
                id={FormRadioFilters[key]?.id}
                name={FormRadioFilters[key]?.name}
                value={FormRadioFilters[key]?.value}
                text={FormRadioFilters[key]?.text}
              />
            </div>
          ))}
        </div>

        <div>
          <Select
            name="status"
            id="status"
            selected="وضعیت پروژه"
            options={ProjectsSelectOptions}
          />
        </div>

        <div>
          <Number
            label={"ظرفیت:"}
            min={1}
            max={10}
            name={"capacity"}
            id={"capacity"}
          />
        </div>

        <div>
          <input
            type="text"
            className="text-sm font-light border-b-2 border-slate-500 focus:outline-0 pb-1"
            placeholder="جست و جو کنید"
          />
        </div>

        <button className="text-sm" type="submit">
          تایید
        </button>
        <button className="text-sm" type="reset">
          ریست
        </button>
      </form>
      <ProjectsTable
        info={{ headers: ProjectsTableHeaders, data: TableMockData }}
      />
    </>
  );
};

export default UserDashboard;
