'use strict';

const path = require('path');
const express = require('express');

const assert = require('assert');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'public', 'index.html'));
});

module.exports = router;

