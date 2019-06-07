import express from "express";
import { MyType } from "shared/types/mytypes";

const api = express();

api.get("/", async (req, res) => {
  const returnValue: MyType = {
    success: true,
    successMessage: "My App Api",
    errorMessage: null
  };

  res.json(returnValue).end();
});

export default api;
