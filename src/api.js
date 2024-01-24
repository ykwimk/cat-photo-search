const API_ENDPOINT =
  "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch(e) {
    console.error(e);
  }
}

const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatInfo: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
  fetchRandom: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  }
};
