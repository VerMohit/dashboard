"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var serverless_1 = require("@neondatabase/serverless");
var dotenv_1 = require("dotenv");
var neon_http_1 = require("drizzle-orm/neon-http");
(0, dotenv_1.config)();
var sql = (0, serverless_1.neon)(process.env.DATABASE_URL); // Use the connection string from .env
exports.db = (0, neon_http_1.drizzle)({ client: sql }); // Initialize Drizzle ORM with Neon Postgres client
