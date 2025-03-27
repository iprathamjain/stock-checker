// Telegram bot config
const BOT_TOKEN = "6535021481:AAEvPfMzXgkOoouX3e7LLSrFJ2hidlyA8T8";
const CHAT_ID = "@appleupdatejam"; // Use @channel_name or your chat ID

// Watch URL
const WATCH_URL =
  "https://www.hmtwatches.in/product_details?id=eyJpdiI6Ilgra0ZDS0FBa0FlZGpKUzNuWEVzdWc9PSIsInZhbHVlIjoiVzVLZjk0Y0grMlhGMWsyY3JMMlY0dz09IiwibWFjIjoiMjk5MmFkMTM0MmJiNTJkZmFiMDc3NWEwODY2ZWY1YWZmMWJmZmUzNjAwMWJhNDdmMzlkYTc3YWZiMzBiYjliYiIsInRhZyI6IiJ9";

// Function to check stock
const checkStock = async () => {
  try {
    const response = await fetch(WATCH_URL, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Referer: "https://www.hmtwatches.in",
      },
    });

    const html = await response.text();

    // Check if "Add to Cart" button is present
    if (html.includes("add to cart")) {
      console.log("🟢 Watch is AVAILABLE!");
      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=🟢 Watch is AVAILABLE! [Buy Now](${WATCH_URL})&parse_mode=Markdown`,
        {
          method: "POST",
        }
      );
    } else {
      console.log("🔴 Watch is OUT OF STOCK.");
      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=🔴 Watch is OUT OF STOCK 😢`,
        {
          method: "POST",
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=⚠️ Error: ${error.message}`,
      {
        method: "POST",
      }
    );
  }
};

// Run the script every 5 minutes
setInterval(checkStock, 1 * 60 * 1000); // 5 mins interval
