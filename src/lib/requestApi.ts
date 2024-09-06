import axios from "axios";

export const RequestApi = async (
  url: string,
  { data = "", method = "POST" }: { data?: string; method?: string } = {}
): Promise<any> => {
  return await axios({
    url: url,
    data,
    method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    withCredentials: false,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};
