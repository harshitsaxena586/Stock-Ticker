import express, { NextFunction, Request, Response, Errback } from "express";
import finnhubController from "./controllers/finnhubController";

// const express = require("express");

const PORT = process.env.port || 3000;

const app = express();
app.use(express.json());

app.use(
  "/api/v1",
  finnhubController.findPrice,
  finnhubController.findSymbol,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.use(express.static("build"));

app.use((req: Request, res: Response) => res.status(404));

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Caught Unknown Express Error",
    status: 500,
    message: { err: "Error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}...`);
});
