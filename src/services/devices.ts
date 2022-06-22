import axios from 'axios';
const BASE_URL = 'https://vstechtest.azurewebsites.net';

export const getDevicesData = async () => {
  const config = {
    method: 'get',
    url: `${BASE_URL}/api/GetData`,
    headers: {
      Authorization: 'Bearer ade74927-f3df-4718-8f85-d10bab443b1c',
    },
  };
  let res;
  try {
    res = await axios(config);
  } catch (e) {
    console.log('error', e);
  }
  return res?.data;
};
