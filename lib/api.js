const BASE_URL = "https://dummyjson.com";

//USE onlyArray parameter if you want only array without info of total, skip and limit

//get posts
export const getPosts = async ({ params, onlyArray = true }) => {
  try {
    const res = await fetch(`${BASE_URL}/posts?${params}`, {
      next: {
        revalidate: 1800,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await res.json();

    if (onlyArray === true) {
      return data.posts;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Re-throw the error to handle it in the calling function
    throw error;
  }
};

//get osts by user_id
export const getPostsByUserId = async ({ params }) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/user/${params}`, {
      next: {
        revalidate: 1800,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts by user id");
    }

    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Re-throw the error to handle it in the calling function
    throw error;
  }
};

export const getUsers = async ({ params, onlyArray = true }) => {
  try {
    const res = await fetch(`${BASE_URL}/users?${params}`, {
      next: {
        revalidate: 1800,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();

    if (onlyArray === true) {
      return data.users;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    // Re-throw the error to handle it in the calling function
    throw error;
  }
};

export const getSingleUserById = async ({ params }) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${params}`, {
      next: {
        revalidate: 1800,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    // Re-throw the error to handle it in the calling function
    throw error;
  }
};
