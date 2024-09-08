const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getWalletTokensBalance = async (
  access_token: string,
  address: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/token/wallet/${address}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during getting wallet tokens balance:", error);
    throw error;
  }
};
