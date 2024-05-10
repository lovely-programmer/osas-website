"use client";
import nodemailer from "nodemailer";
import { getAllUser } from "../requests/requests";

const { allUser } = getAllUser();

const emails = allUser.map((users) => users.emails);

console.log(emails);

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const mailOptions = {
  from: process.env.EMAIL,
  to: "olaoluwaolasunkanmi5@gmail.com",
};
