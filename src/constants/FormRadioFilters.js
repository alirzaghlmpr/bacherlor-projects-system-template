export const RadiosFiltersName = "queryType";

const supervisor = "supervisor";
const title = "title";

export const FormRadioFilters = Object.freeze({
  [supervisor]: {
    name: RadiosFiltersName,
    key: "1",
    value: "supervisor",
    id: "supervisor",
    text: "استاد",
  },
  [title]: {
    name: RadiosFiltersName,
    key: "2",
    value: "title",
    id: "title",
    text: "عنوان",
  },
});

export const FormRadioFiltersKeys = [supervisor, title];
