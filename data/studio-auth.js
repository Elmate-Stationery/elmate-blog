// data/studio-auth.js
//
// Credentials for the /studio/ content generator page.
//
// IMPORTANT: this is a soft, client-side gate — NOT real security. This is a
// static site with no server or database, so there is no way to keep a
// secret truly hidden from someone who opens DevTools and reads the JS.
// This only keeps casual visitors from stumbling into the tool; it will not
// stop a determined person. Never put anything genuinely sensitive behind
// it, and don't reuse a password you use anywhere else.
//
// To change the password:
//   1. Open any browser's console (F12) on any page of this site.
//   2. Run:
//        await crypto.subtle.digest("SHA-256", new TextEncoder().encode("123456"))
//          .then(buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join(""))
//   3. Copy the resulting string into passwordHash below.
//

export const studioAuth = {
  email: "admin@elmatestationery.com",
  passwordHash:
    "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
};
