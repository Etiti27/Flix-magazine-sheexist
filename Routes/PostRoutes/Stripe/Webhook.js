require('dotenv').config();
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.API_TEST_KEY);
const prices=require('./Payment').prices
const usernames=require('./Payment').usernames

module.exports =router;