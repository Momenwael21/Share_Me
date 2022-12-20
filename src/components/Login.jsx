import React from "react";
import { useEffect } from "react";
import videoShare from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { gapi } from "gapi-script";
import { client } from "../client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const googleResponse = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="relative w-full h-full flex bg-blackOverlay">
        <video
          className="w-full h-full object-cover"
          loop
          muted
          autoPlay
          src={videoShare}
        />
        <div className="absolute top-0 bottom-0 bg-blackOverlay w-full h-full flex flex-col justify-center items-center">
          <div className="p-5">
            <img src={logo} alt="logo" width={130} />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              className="bg-white"
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-white cursor-pointer hover:opacity-60 flex p-2 rounded-lg outline-none items-center"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" size={26} /> Sign In With Google
                </button>
              )}
              onSuccess={googleResponse}
              onFailure={googleResponse}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
