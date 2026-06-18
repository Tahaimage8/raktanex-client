"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

const contactCards = [
  {
    title: "Emergency Hotline",
    value: "+880 1700-000000",
    description: "Call us for urgent blood donation support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.46.56 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z" />
      </svg>
    ),
  },
  {
    title: "Email Support",
    value: "support@raktanex.com",
    description: "Send your questions or partnership request.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.4 4.25-7.07 4.42a1 1 0 0 1-1.06 0L4.4 8.25A1 1 0 1 1 5.46 6.55L12 10.64l6.54-4.09a1 1 0 1 1 1.06 1.7Z" />
      </svg>
    ),
  },
  {
    title: "Service Area",
    value: "Bangladesh",
    description: "Search donors by blood group, district, and upazila.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
      </svg>
    ),
  },
];

export default function ContactUs() {
  const [messageSent, setMessageSent] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log("Contact form data:", data);

    setMessageSent(true);
    event.currentTarget.reset();

    setTimeout(() => {
      setMessageSent(false);
    }, 3000);
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-red-100/70 blur-3xl dark:bg-red-950/30" />
      <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-rose-100/80 blur-3xl dark:bg-red-900/20" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400">
            Contact Us
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Need help finding
            <span className="block bg-linear-to-r from-red-600 to-rose-700 bg-clip-text text-transparent">
              blood donors?
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            Reach out to RaktaNex for donor support, request assistance, or
            partnership questions. We are here to make blood donation easier.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Cards */}
          <div className="space-y-5">
            {contactCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-[2rem] border border-red-100 bg-white p-6 shadow-sm shadow-red-100 dark:border-red-900/50 dark:bg-slate-900 dark:shadow-none"
              >
                <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-red-100 blur-3xl transition group-hover:bg-red-200 dark:bg-red-950/30 dark:group-hover:bg-red-900/40" />

                <div className="relative flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100 dark:bg-red-950/50 dark:text-red-400 dark:ring-red-900/50">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-950 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-base font-bold text-red-600 dark:text-red-400">
                      {item.value}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


{/* Right Form */}
<motion.div
  initial={{ opacity: 0, x: 24 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="rounded-[2rem] border border-red-100 bg-white p-6 shadow-xl shadow-red-100 sm:p-8"
>
  <div className="mb-8">
    <h3 className="text-2xl font-black text-slate-950">
      Send us a message
    </h3>

    <p className="mt-2 text-sm leading-6 text-slate-600">
      Fill out the form below and our support team will get back to you soon.
    </p>
  </div>

  <Form className="w-full space-y-5" onSubmit={onSubmit}>
    <div className="grid w-full gap-5 sm:grid-cols-2">
      <TextField
        isRequired
        name="name"
        className="flex w-full flex-col gap-2"
      >
        <Label className="text-sm font-bold text-slate-700">
          Your Name
        </Label>

        <Input
          placeholder="Enter your name"
          className="h-12 w-full rounded-2xl border border-red-100 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        />

        <FieldError className="text-xs font-medium text-red-600" />
      </TextField>

      <TextField
        isRequired
        name="email"
        type="email"
        className="flex w-full flex-col gap-2"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label className="text-sm font-bold text-slate-700">
          Email Address
        </Label>

        <Input
          placeholder="Enter your email"
          className="h-12 w-full rounded-2xl border border-red-100 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        />

        <FieldError className="text-xs font-medium text-red-600" />
      </TextField>
    </div>

    <TextField
      isRequired
      name="subject"
      className="flex w-full flex-col gap-2"
    >
      <Label className="text-sm font-bold text-slate-700">
        Subject
      </Label>

      <Input
        placeholder="Example: Need O+ blood donor"
        className="h-12 w-full rounded-2xl border border-red-100 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
      />

      <FieldError className="text-xs font-medium text-red-600" />
    </TextField>

    <TextField
      isRequired
      name="message"
      className="flex w-full flex-col gap-2"
      minLength={10}
      validate={(value) => {
        if (value.length < 10) {
          return "Message must be at least 10 characters";
        }

        return null;
      }}
    >
      <Label className="text-sm font-bold text-slate-700">
        Message
      </Label>

      <TextArea
        placeholder="Write your message here..."
        className="min-h-36 w-full resize-none rounded-2xl border border-red-100 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
      />

      <Description className="text-xs text-slate-500">
        Tell us briefly how we can help you.
      </Description>

      <FieldError className="text-xs font-medium text-red-600" />
    </TextField>

    {messageSent && (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"
      >
        Message sent successfully. We will contact you soon.
      </motion.p>
    )}

    <Button
      type="submit"
      className="h-13 w-full rounded-2xl bg-linear-to-r from-red-600 via-rose-600 to-red-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:shadow-red-300"
    >
      Send Message
    </Button>
  </Form>
</motion.div>
        </div>
      </div>
    </section>
  );
}