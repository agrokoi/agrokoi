import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterView = () => {
  const { push } = useRouter();
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    if (data.password.length < 8) {
      setErrorMessages({
        ...errorMessages,
        password: "Panjang Password harus lebih dari 8",
      });
      return;
    } else {
      setErrorMessages({ ...errorMessages, password: "" });
    }

    if (data.email.length < 6) {
      setErrorMessages({
        ...errorMessages,
        email: "Email harus lebih dari 6 karakter",
      });
      return;
    } else {
      setErrorMessages({ ...errorMessages, email: "" });
    }

    if (data.fullname.length < 3) {
      setErrorMessages({
        ...errorMessages,
        fullname: "Panjang Nama harus lebih dari 6",
      });
      return;
    } else {
      setErrorMessages({ ...errorMessages, fullname: "" });
    }

    if (data.phone.length < 10) {
      setErrorMessages({
        ...errorMessages,
        phone: "Nomor Telepon setidaknya 10 angka",
      });
      return;
    } else {
      setErrorMessages({ ...errorMessages, phone: "" });
    }

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      event.target.reset();
      push("/auth/login");
    } else {
      const responseData = await result.json();
      if (responseData.message.includes("already exists")) {
        setErrorMessages({
          ...errorMessages,
          email: "Email dan Nomor Telepon sudah terdaftar.",
        });
        push("/auth/register");
        return;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md bg-gray-200"
            />
            {errorMessages.email && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="mt-1 p-2 w-full border rounded-md bg-gray-200"
            />
            {errorMessages.fullname && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessages.fullname}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600">
              Telepon
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="mt-1 p-2 w-full border rounded-md bg-gray-200"
            />
            {errorMessages.phone && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.phone}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600">
              Password
            </label>
            {errorMessages.password && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessages.password}
              </p>
            )}
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md bg-gray-200"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm md:text-md text-gray-600">
          Already have an account?
          <Link href="/auth/login" className="ml-4 text-blue-600 text-sm md:text-md font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
