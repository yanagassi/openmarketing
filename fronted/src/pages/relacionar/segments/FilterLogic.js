import { filterBy } from "data-query";

export const applyFilter = (data, filter) => {
  return filterBy(data, filter);
};

export const getFilteredData = (data, filter, skip, take) => {
  const filteredData = applyFilter(data, filter);
  return filteredData.slice(skip, skip + take);
};
