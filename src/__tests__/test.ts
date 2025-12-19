const users_url = "http://localhost:3000/api/users";

async function testRateLimit(): Promise<void> {
  for (let i = 1; i <= 10; i++) {
    try {
      const res = await fetchWithTimeout(
        users_url,
        { method: "GET" },
        5_000,
        10
      );
      const json: unknown = await res?.json();

      console.log(
        `Request ${i}:`,
        res?.status,
        "OK",
        Array.isArray(json) ? json.length : json
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Request ${i}: RATE LIMITED`, err.message);
      } else {
        console.error(`Request ${i}: RATE LIMITED`, err);
      }
    }
  }
}

const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeoutMs: number = 10 * 60 * 1000, // 10 minutes default
  maxRetries = 3
) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      console.error(
        `Attempt ${attempt}/${maxRetries} failed for ${url}:`,
        error
      );

      if (attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff: wait longer between retries
      const delay = 1000 * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

testRateLimit();
