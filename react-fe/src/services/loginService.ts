const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AuthWithBE {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export const authenticateWithBE = async (data: AuthWithBE) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        profilePicture: data.picture,
        sub: data.sub,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const authenticateWithGoogle = async (access_token: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
