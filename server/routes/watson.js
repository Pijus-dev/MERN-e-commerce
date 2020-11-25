import express from "express";

import expressAsyncHandler from "express-async-handler";
import AssistantV2 from "ibm-watson/assistant/v2.js";
import { IamAuthenticator } from "ibm-watson/auth/index.js";

const router = express.Router();

const authenticator = new IamAuthenticator({
  apikey: "7T1Y7HMWX0IIp3cP1gXRUoM6q8GRRWzClmm5QqXwgYE_",
});

const assistant = new AssistantV2({
  version: "2019-02-28",
  authenticator: authenticator,
  url:
    "https://api.au-syd.assistant.watson.cloud.ibm.com/instances/0e03096f-ebc5-47a3-b741-cfb45a0fae57",
});

router.get(
  "/session",
  expressAsyncHandler(async (req, res) => {
    const session = await assistant.createSession({
      assistantId: "4af0af31-9592-4633-b775-201af65d5e20",
    });
    if (session) {
      res.send(session["result"]);
    } else {
      res.send({ message: "there was an error" });
    }
  })
);

router.post(
  "/message",
  expressAsyncHandler(async (req, res) => {
    const payload = {
      assistantId: "4af0af31-9592-4633-b775-201af65d5e20",
      sessionId: req.headers.session_id,
      input: {
        message_type: "text",
        text: req.body.input,
      },
    };
    const message = await assistant.message(payload);
    if (message) {
      res.json(message["result"]);
    } else {
      res.json({ message: "there was an error" });
    }
  })
);

export default router;
