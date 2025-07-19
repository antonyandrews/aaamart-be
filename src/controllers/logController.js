const Log = require("../models/logModel");


async function saveLog(req, res) {
  try {
    const logEntry = new Log({
      level: req.body.level || "error",
      context: req.body.context,
      message: req.body.message,
      status: req.body.status || '',
      statusText: req.body.statusText || '',
      stack: req.body.stack || "",
      timestamp: new Date(),
      userAgent: req.headers["user-agent"],
      actualError: req.body.actualError
    });

    await logEntry.save();
    res.status(201).json({ message: "Log saved" });
  } catch (error) {
    console.error("Failed to save client log:", error);
    res.status(500).json({ error: "Failed to log" });
  }
}

module.exports = { saveLog };
