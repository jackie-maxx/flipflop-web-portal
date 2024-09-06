import axios from "axios";

export const RequestApi = async (
  url: string,
  { data = "", method = "POST" }: { data?: string; method?: string } = {}
): Promise<any> => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  return await axios({
    url: url,
    data,
    method,
    headers: headersList,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};
