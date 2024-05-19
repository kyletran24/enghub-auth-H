const ParseDate = (date: string) => {
  return date.replace(/\D/g, "");
};

export default ParseDate;
