import { baseRequest, baseGetRequest } from "./base";

const getFinancialStatements = async (page) => {
  var url = `/api/financialstatements?language=english&page=${page}`;
  var response = await baseGetRequest(url);
  return response;
};

const getFinancialStatementById = async (id) => {
  var response = await baseGetRequest("/api/financialstatements/" + id);
  return response;
};

const createFinancialStatement = async (body) => {
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);
  data.append("file", body.file.raw);

  var response = await baseRequest("/api/financialstatements", "POST", data);
  return response;
};

const updateFinancialStatement = async (id, body) => {
  console.log(body);
  const data = new FormData();
  data.append("nepali[title]", body.nepali.title);
  data.append("english[title]", body.english.title);

  var response = await baseRequest(
    "/api/financialstatements/" + id,
    "POST",
    data
  );
  return response;
};

const deleteFinancialStatement = async (id) => {
  var response = await baseRequest("/api/financialstatements/" + id, "DELETE");
  return response;
};

export {
  getFinancialStatements,
  getFinancialStatementById,
  createFinancialStatement,
  updateFinancialStatement,
  deleteFinancialStatement,
};
