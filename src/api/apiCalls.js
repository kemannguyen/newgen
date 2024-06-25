import { getApiData } from "./openAPI";
import { postApiData, patchApiData } from "./protectedAPI";

const getUsers = async () => {
  const response = await getApiData("/");

  if (!response) {
    return undefined;
  }

  return await response;
};

const getOneUser = async (userName) => {
  const response = await getApiData(`?username=${userName}`);

  if (!response) {
    return undefined;
  }

  return await response;
};

const addUser = async (user) => {
  const response = await postApiData("/", user);

  if (!response) {
    return undefined;
  }

  return await response;
};

const updateUser = async (userId, body) => {
  const response = await patchApiData(userId, body);

  if (!response) {
    return undefined;
  }

  return await response;
};

export { getUsers, getOneUser, addUser, updateUser };