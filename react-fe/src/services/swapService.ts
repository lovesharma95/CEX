const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getSwapAmount = async (
  baseAssetMint: string,
  quoteAssetMint: string,
  baseAmount: string,
  baseAssetDecimals: number,
  controller: AbortController
) => {
  try {
    const response = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${baseAssetMint}&outputMint=${quoteAssetMint}&amount=${
        Number(baseAmount) * 10 ** baseAssetDecimals
      }&slippageBps=50`,
      {
        method: "GET",
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during getting Swap amount:", error);
    throw error;
  }
};

export const swapTokens = async (quoteResponse: any, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/token/swap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(quoteResponse),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during Swap tokens:", error);
    throw error;
  }
};
