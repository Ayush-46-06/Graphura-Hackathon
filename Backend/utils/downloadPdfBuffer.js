import axios from "axios";

export const downloadPdfAsBuffer = async (url) => {
  const response = await axios.get(url, {
    responseType: "arraybuffer"
  });
  return Buffer.from(response.data);
};