export const RadiosFiltersName = "search_by";

const supervisor = "professor";
const title = "title";

export const FormRadioFilters = Object.freeze({
  [supervisor]: {
    name: RadiosFiltersName,
    key: "1",
    value: "professor",
    id: "professor",
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
