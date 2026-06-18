import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGO_DB_URI;

const client = new MongoClient(uri);
const db = client.db("raktanex");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "donor",
        input: false,
      },

      status: {
        type: "string",
        defaultValue: "active",
        input: false,
      },

      bloodGroup: {
        type: "string",
        required: false,
      },

      division: {
        type: "string",
        required: false,
      },

      district: {
        type: "string",
        required: false,
      },

      upazila: {
        type: "string",
        required: false,
      },
    },
  },
});
