import _ from "lodash";

/**
 * Wrap fetch API by adding headers
 * multipart is required due to:
 * https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
 * 
 * Example usage: 
    const data = await request(`/api/patients/${patientName}/visitLog`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    }) 
 */

const getUrl = (endpoint, dev_override_port) => {
  // TODO change this url to the actual url
  const url = "https://api.github.com";
  return url + endpoint;
};

// eslint-ignore-next-line
const request = async (
  endpoint,
  options,
  multipart = false,
  dev_override_port = null
) => {
  const fetchOptions = _.merge(
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: "asd232sac_ascasca",
      },
    },
    options
  );

  if (multipart) {
    fetchOptions.headers["Content-Type"] = "";
  }

  const url = getUrl(endpoint, dev_override_port);
  return fetch(url, fetchOptions).then(async (response) => {
    const body = await response.json();

    if (response.ok) {
      return body;
    } else {
      // eslint-disable-next-line
      throw { status: response.status, ...body };
    }
  });
};

export default request;
