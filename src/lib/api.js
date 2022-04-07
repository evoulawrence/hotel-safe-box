import env from './../env';

export const endpoint = (code = null) => {
  return {
    validation: `${env.validationRoute}?code=${code}`,
  };
};

export const validationMasterCode = (code) => {
  fetch(endpoint(code).validation)
    .then((response) => response.json())
    .then((myJson) => myJson);
};
