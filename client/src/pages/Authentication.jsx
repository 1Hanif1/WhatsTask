import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  const data = await request.formData();

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  if (mode == "signup") {
    const authData = {
      name: data.get("name"),
      phoneNumber: data.get("phoneNumber"),
      email: data.get("email"),
      userPhoto: data.get("userPhoto"),
      password: data.get("password"),
      passwordConfirm: data.get("passwordConfirm"),
    };

    const res = await fetch("http://127.0.0.1:3000/" + mode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
      },
      body: JSON.stringify(authData),
    });

    if (res.status === 422 || res.status === 401) {
      return res;
    }

    if (!res.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    const resData = await res.json();
    console.log(resData);
    const token = resData.token;
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/auth?mode=login");
  }
  if (mode == "login") {
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const res = await fetch("http://127.0.0.1:3000/" + mode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
      },
      body: JSON.stringify(authData),
    });

    if (res.status === 422 || res.status === 401) {
      return res;
    }

    if (!res.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    const resData = await res.json();
    console.log(resData);
    const token = resData.token;
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/auth?mode=login");
  }
}
