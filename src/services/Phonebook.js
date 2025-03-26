import axios from "axios";

const baseUrl = "https://fullstackopen-phonebook-backend-k72h.onrender.com/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);
const create = (newPerson) => axios.post(baseUrl, newPerson).then((response) => response.data);
const remove = (id) => axios.delete(`${baseUrl}/${id}`);
const update = (id, updatedPerson) => axios.put(`${baseUrl}/${id}`, updatedPerson).then((response) => response.data);

export default { getAll, create, remove, update };