import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import profile from "../Assets/img/profile.jpg";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import { updateAccount } from "../Store/actions/userActions";
import toast from "react-hot-toast";
const OnBoarding = () => {
  let isLogin = useContext(Context);
  const [error, seterror] = useState({});
  const [profileImg, setProfileImg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [onboarding, setonboarding] = useState(JSON.parse(localStorage.getItem("user")));
  const profileData = async (e) => {
    if (e.target.value != "") {
      if (e.target.type === "file") {
        if (e.target.files[0]?.type.includes("image")) {
          setProfileImg(await toBase64(e.target.files[0]))
          onboarding[e.target.name] = e.target.files[0];
          delete error[e.target.name];
        } else {
          onboarding[e.target.name] = "";
          error[e.target.name] = "Can Upload Only Image Files";
        }
      } else if (e.target.type == "date") {
        if (new Date().getTime() < new Date(e.target.value).getTime()) {
          error[e.target.name] = "Invalid Date";
        } else if (
          new Date().getFullYear() - new Date(e.target.value).getFullYear() <
          13
        ) {
          error[e.target.name] = "Age Can't be Less than 13 ";
        } else {
          onboarding[e.target.name] = e.target.value;

          delete error[e.target.name];
        }
      } else {
        onboarding[e.target.name] = e.target.value;
        delete error[e.target.name];
      }
      setonboarding({ ...onboarding });
    } else {
      error[e.target.name] = "Required*";
    }

    seterror({ ...error });
  };

  const addProfile = async (e) => {
    e.preventDefault();
    for (let x in onboarding) {
      if ((onboarding[x] == undefined || onboarding[x] == "") && x != "__v") {
        error[x] = "Required*";
      } else if (onboarding[x] && error[x] == "Required*") {
        delete error[e.target.name];
      }
    }

    seterror({ ...error });

    if (Object.keys(error).length == 0) {

      let formData = new FormData();
      for (let key in onboarding) {
        formData.append(key, onboarding[key]);
      }
      const response = await dispatch(updateAccount(formData));
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Profile Updated Successfully");
        isLogin.setuserName(formData.username);
        navigate("/profile")
      }
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        });
  const removeProfilePic = () => {
    onboarding["profileImg"] = "";
    setonboarding({ ...onboarding });
    setProfileImg("")
  };

  return (
    <>
      <div className="onboardingPage">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            background: "#645a5a8f",
            padding: 3,
          }}
        >
          <Form onSubmit={addProfile} className="signUp p-3  onboardingForm">
            <legend className="fw-bold text-white text-center fs-1">
              {" "}
              Profile Info
            </legend>
            <Box sx={{ display: "flex", color: "white" }}>
              <div className="w-100">
                <div className="w-100 d-flex flex-column align-items-center">
                  <img
                    src={ profileImg !== "" ? profileImg : profile}
                    className="mt-3 me-5"
                    style={{
                      maxWidth: "200px",
                      borderRadius: "50% ",
                      maxHeight: "200px",
                      minWidth: "200px",
                      minHeight: "200px",
                    }}
                    alt=""
                  />
                  <Form.Label className="fw-bold mt-2 me-5">
                    Profile Img
                  </Form.Label>
                  <label
                    className="btn btn-light  mt-3 me-4"
                    type="button"
                    htmlFor="profile"
                  >
                    Upload Profile Pic
                  </label>
                  <Form.Control
                    type="file"
                    name="profileImg"
                    onChange={profileData}
                    className="d-none"
                    id="profile"
                  />
                  {onboarding["profileImg"] &&
                  onboarding["profileImg"] != profile ? (
                    <button
                      className="btn btn-danger  mt-3 me-4"
                      type="button"
                      onClick={() => removeProfilePic()}
                    >
                      Remove Profile Pic
                    </button>
                  ) : (
                    <></>
                  )}
                  <Typography variant="subtitle2" color="red" sx={{ mt: 1 }}>
                    {error.profileImg ?? ""}
                  </Typography>
                </div>
              </div>
              <div className="w-100">
                <Form.Label className="fw-bold mt-2">User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={profileData}
                />
                <Typography variant="subtitle2" color="red" sx={{ mt: 1 }}>
                  {error.username ?? ""}
                </Typography>
                <Form.Label className="fw-bold mt-2">Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  onChange={profileData}
                />
                <Typography variant="subtitle2" color="red" sx={{ mt: 1 }}>
                  {error.mobile ?? ""}
                </Typography>
                <Form.Label className="fw-bold mt-2">Birth Date</Form.Label>
                <Form.Control type="date" name="dob" onChange={profileData} />
                <Typography variant="subtitle2" color="red" sx={{ mt: 1 }}>
                  {error.dob ?? ""}
                </Typography>
                <Form.Label className="fw-bold mt-2">Discription</Form.Label>
                <Form.Control
                  as="textarea"
                  name="bio"
                  rows={3}
                  onChange={profileData}
                />
                <Typography variant="subtitle2" color="red" sx={{ mt: 1 }}>
                  {error.bio ?? ""}
                </Typography>
              </div>
            </Box>

            <button
              className="btn btn-light w-100 rounded-5 mt-3"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Box>
      </div>
    </>
  );
};

export default OnBoarding;
