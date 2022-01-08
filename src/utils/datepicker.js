import moment from "moment";


export const checkBefore = (date1 = Date.now(), date2 = Date.now()) => {
  return moment(date1).isBefore(date2);
};

export const checkAfter = (date1 = Date.now(), date2 = Date.now()) => {
  return moment(date1).isAfter(date2);
};

export const formatDate = date => {
  return moment(date).format('MMM DD, YYYY');
};

export const subtractDate = (amount, unit, dateFrom = Date.now()) => {
  return moment(dateFrom).subtract(amount, unit);
};


