import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import "./strategies/google.js";
import "./strategies/github.js";

dotenv.config();

import "./strategies/google.js";
import "./strategies/github.js";

const app = express();

app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Google
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login.html" }),
  (req, res) => res.redirect("/challenges.html")
);

// GitHub
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login.html" }),
  (req, res) => res.redirect("/challenges.html")
);

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/login.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`✅ TenaNet CTF running on http://localhost:${process.env.PORT}`)
);
