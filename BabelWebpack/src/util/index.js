exports.test = function() {
  if (process.env.TEST) {
    return `process.env.TEST: ${process.env.TEST}`;
  } else {
    throw new Error("no process.env.TEST");
  }
};
