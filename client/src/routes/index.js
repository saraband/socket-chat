export const addParamsToUrl = (url, params) => {
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });

  return url;
};

export default {
  ROOMS_LIST: '/',
  ROOM: '/room/:roomId',
  PROFILE: '/profile/:userId'
};