import express from 'express';
import cors from 'cors';
const router = express.Router();
import {
  getMall,
  saveMall,
} from '../controllers/shoppingMallController.js';

// root level route, this one is optional
router.get('/', cors(), (req, res, next) => {
  res.json('Welcome to the dawg api 🐶');
});

/**
 * all stores routes
 */
 router.options('/mall', (req, res, next) => {
  //set header before response
  res.header({
    allow: 'GET, POST, OPTIONS',
    'Content-type': 'application/json',
    Data: Date.now(),
    'Content-length': 0,
  });
  //response
  res.sendStatus(200);
});

// get a collection of all the stores and ou can use a query
router.get('/mallById', cors(), getMall);

// get an individual store
router.post('/saveMall', cors(), saveMall);

// post a route using the middleware for reading the body
// router.post('/stores', cors(), setStore);

// delete an individual store
// TODO: not implemented yet
router.delete('/stores/:id', cors(), (req, res, next) => {
  const store = req.params.store;
  res.json({
    title: 'deleted',
    message: `oops ${store} was deleted accidentally 🥺`,
  });
});

export default router;
