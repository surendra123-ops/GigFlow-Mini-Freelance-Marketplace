const logger = {
  info: (...params) => console.log("[INFO]", ...params),
  error: (...params) => console.error("[ERROR]", ...params),
  warn: (...params) => console.warn("[WARN]", ...params),
};

export default logger;
