import auth from "../firebase/auth";

const BASE_URL = `${import.meta.env.VITE_FB_DATABASE_URL}/foods`;

const getToken = () => auth?.currentUser?.accessToken ?? "";

const getUriForList = () => `${BASE_URL}.json?auth=${getToken()}`;

const getUriForOne = (id) => `${BASE_URL}/${id}.json?auth=${getToken()}`;

const _time = (time) => new Date(time).getTime();

// search
export const searchNameFromData = async (name) => {
  const getURIForName = `${BASE_URL}/list.json?orderBy="name"&equalTo="${name}"&print=pretty&auth=${getToken()}`;
  const res = await fetch(getURIForName);
  const employeeName = await res.json();
  return Object.keys(employeeName ?? {})
    .map((key) => ({
      id: key,
      ...employeeName[key],
    }));
}

export const getAllFoods = async () => {
  const response = await fetch(getUriForList());
  const foods = await response.json();

  // Mapping the id-s into the response array
  return Object.keys(foods ?? {})
    .map((key) => ({
      id: key,
      ...foods[key],
    }))
    .toSorted((a, b) => _time(b.created) - _time(a.created));
};

export const getOneFoodById = async (id) => {
  const response = await fetch(getUriForOne(id));
  const food = await response.json();
  return food;
};

export const updateFood = async (id, data) => {
  const response = await fetch(getUriForOne(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Update operation failed");
  }

  return response;
};

export const deleteFood = async (id) => {
  const response = await fetch(getUriForOne(id), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Delete operation failed");
  }

  return response;
};

export const createFood = async (food) => {
  const response = await fetch(getUriForList(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...food, created: Date.now() }),
  });

  if (!response.ok) {
    throw new Error("Create operation failed");
  }

  return await response.json();
};
