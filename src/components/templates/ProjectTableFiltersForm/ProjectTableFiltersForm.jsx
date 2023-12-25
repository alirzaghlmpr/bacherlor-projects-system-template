import {
  FormRadioFilters,
  FormRadioFiltersKeys,
} from "../../../constants/FormRadioFilters";
import {
  ProjectsSelectOptions,
  SelectOptionName,
  SelectDefaultOption,
} from "../../../constants/ProjectsSelectOptions";
import {
  NumberFilterName,
  NumberFilterMin,
  NumberFilterMax,
  NumberFilterLabel,
} from "../../../constants/ProjectsNumberFilter";

import {
  ProjectQueryFilter,
  ProjectQueryPlaceholder,
} from "../../../constants/ProjectsQueryFilter";
import Radio from "../../../components/shared/Radio/Radio";
import Select from "../../../components/shared/Select/Select";
import Number from "../../../components/shared/Number/Number";

import Search from "../../../assets/icons/search.svg";
import Cross from "../../../assets/icons/cross.png";

const ProjectTableFiltersForm = ({ submitHandeler }) => {
  return (
    <form
      onSubmit={submitHandeler}
      className="flex flex-col items-start md:items-center  gap-5 my-5 md:px-0 px-2">
      <div className="flex items-center gap-8">
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
            name={SelectOptionName}
            id={SelectOptionName}
            selected={SelectDefaultOption}
            options={ProjectsSelectOptions}
          />
        </div>

        <div>
          <Number
            label={NumberFilterLabel}
            min={NumberFilterMin}
            max={NumberFilterMax}
            name={NumberFilterName}
            id={NumberFilterName}
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <input
          name={ProjectQueryFilter}
          type="search"
          className="text-sm font-light border-b-2 border-slate-500 focus:outline-0 pb-1"
          placeholder={ProjectQueryPlaceholder}
        />
        <button className="text-sm p-1 rounded-lg  bg-slate-500" type="submit">
          <img src={Search} width="25" alt="" />
        </button>
        <button
          className="text-sm p-1 rounded-lg border-2 border-slate-500"
          type="reset">
          <img src={Cross} width="22" alt="" />
        </button>
      </div>
    </form>
  );
};

export default ProjectTableFiltersForm;
