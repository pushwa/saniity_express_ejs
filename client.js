const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "ypr6txa9",
  dataset: "production",
  useCdn: true, // False will fetch faster but increase the cost
  apiVersion: "2024-02-24",
});

module.exports = client;
