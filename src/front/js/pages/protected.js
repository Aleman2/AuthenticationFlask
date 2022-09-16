import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
export const Protected = () => {
  let navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [data, setData] = useState(null);

  const protectedData = async () => {
    const token = localStorage.getItem("jwt-token");
    const response = await fetch(process.env.BACKEND_URL + "/api/protected", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) throw Error("There was a problem in the login request");
    const responseJson = await response.json();
    setData(responseJson);
  };

  useEffect(() => {
    if (store.user_token === null) navigate("/login");
    else protectedData();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <div className="alert alert-info" />
      <h1>{data?`HI ${data.email}! YOUR PROTECTED DATA HERE`:"HI ! YOUR PROTECTED DATA HERE"}</h1>
    </div>
  );
};
