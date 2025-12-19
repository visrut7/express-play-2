// main.js
const URL = "http://localhost:3000/api/users";

async function testRateLimit() {
  for (let i = 1; i <= 10; i++) {
    try {
      const res = await fetch(URL);
      const json = await res.json();

      console.log(
        `Request ${i}:`,
        res.status,
        res.ok ? "OK" : "RATE LIMITED",
        res.ok ? json.length : json
      );
    } catch (err) {
      console.error(`Request ${i}:`, err.message);
    }
  }
}

testRateLimit();
