import axios from 'axios';
const target = 'https://iot.dimensionfour.io/graph';
const TENANT_ID = 'leiacafe';
const TENANT_KEY = '317c347f20c2e9fe3110b955'; //pcherry
async function sendPost(target, json, headers, callback) {
  console.log('Sending data...');

  const res = await axios.post(target, json, { headers: headers });
  if (res.error) {
    console.log('Send error!');
    console.log(res.error);
  } else if (res.data) {
    if (res.data.errors) {
      console.log('Query error!');
      console.log(res.data.errors);
    } else {
      console.log('Success!');
      console.log(res.data.data);
      callback(res.data.data);
    }
  }
}
export const createPoint = (data) => {};
export const fetchSpaces = (callback) => {
  const headers = {
    'x-tenant-id': TENANT_ID,
    'x-tenant-key': TENANT_KEY,
  };
  const query = `
		query LIST_SPACES_WITH_POINTS {
			spaces {
				id
				name
				points {
					id
					name
				}
			}
		}
	`;

  const json = {
    query: query,
    variables: {},
  };
  /*console.log(target);
  console.log(json);
  console.log(headers);
  callback(99);*/
  sendPost(target, json, headers, callback);
};

//export default fetchSpaces;
