const BASE_URL = "https://dummyjson.com";
'https://dummyjson.com/users/1'

export const getPosts = async ({ params }) => {
  try {
    const res = await fetch(`${BASE_URL}/posts?${params}`);

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const getUsers = async ({ params }) => {
  try {
    const res = await fetch(`${BASE_URL}/users?${params}`);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const getSingleUserById = async ({ params }) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${params}`);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
