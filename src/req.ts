import http from "http";

const url = "http://localhost:3000/app/print";
const numRequests = 10000;

function sendRequest(index: number) {
  return new Promise((resolve, reject) => {
    const req = http.get(url + "?number=" + index, (res) => {
      // Handle the response here
      res.on("data", (data) => {
        // Process the response data
      });
      res.on("end", () => {
        resolve();
      });
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

async function sendConcurrentRequests() {
  const requests = [];
  for (let i = 0; i < numRequests; i++) {
    requests.push(sendRequest(i));
  }
  await Promise.all(requests);
}

console.time("req");
sendConcurrentRequests()
  .then(() => {
    console.log("All requests completed");
    console.timeEnd("req");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
