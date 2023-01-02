import axios from "axios";

const KEY= "NShGwNxnpEeli1H-k4xi7w29358";

export default axios.create ( {
  baseURL : "https://api.getAddress.io",
    params: {"api-key" : KEY }
});
