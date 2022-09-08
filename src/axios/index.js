import axios from "axios";

export default axios.create({
    baseURL: "http://aloha-back-end.herokuapp.com/"
    // baseURL: "http://localhost:8080/"
})