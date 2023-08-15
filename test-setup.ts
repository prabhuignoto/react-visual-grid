import "@testing-library/jest-dom";

process.on("unhandledRejection", (reason) => {
  // eslint-disable-next-line no-console
  console.log(`FAILED TO HANDLE`);
  throw reason;
});
