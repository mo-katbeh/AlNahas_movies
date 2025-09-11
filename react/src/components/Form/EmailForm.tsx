import React, { useState } from "react";

// interface Props {
//   onSubmit: (email: string) => void;
// }
const EmailForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // const validateEmail = (value: string) => {
  //   // simple email regex
  //   return /\S+@\S+\.\S+/.test(value);
  // };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateEmail(email)) {
  //     setError("Enter a valid email!!");
  //   }
  // };
  // setError("");
  // onSubmit(email);
  // setEmail("");

  return (
    <form
      // onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 bg-white rounded-md shadow-md"
    >
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Email address
      </label>
      <input
        id="id"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${error ? "border-red-500" : ""}`}
        placeholder="you@example.com"
        required
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default EmailForm;
