import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';

import checkAuthKeyValidation from 'middleware';
import { addKey } from 'assets/authorizatedAccount';

const router = express.Router();

require('dotenv').config();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/authenticationPassword', [urlencodedParser], (req, res) => {
  const { password } = req.body;

  if (password === process.env.CORRECT_PASSWORD) {
    const userKey = uuid();
    addKey(userKey);
    res.send({ status: 'OK', auth: true, key: userKey });
  } else {
    res.send({ status: 'OK', auth: false });
  }

  res.end();
});

// router.post('/getFiles', [urlencodedParser, checkAuthKeyValidation], (req, res) => {
router.post('/getFiles', [urlencodedParser], (req, res) => {
  const folders = fs.readFileSync('../assets/authorizatedAccount.js');
});

export default router;
