import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:8080/"
    baseURL: "http://aloha-back-end.herokuapp.com/"
})