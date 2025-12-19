const users_url = "http://localhost:3000/api/users";

async function testRateLimit(): Promise<void> {
  for (let i = 1; i <= 10; i++) {
    try {
      const res: Response = await fetch(users_url);
      const json: unknown = await res.json();

      console.log(
        `Request ${i}:`,
        res.status,
        res.ok ? "OK" : "RATE LIMITED",
        res.ok && Array.isArray(json) ? json.length : json
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Request ${i}:`, err.message);
      } else {
        console.error(`Request ${i}:`, err);
      }
    }
  }
}

testRateLimit();
