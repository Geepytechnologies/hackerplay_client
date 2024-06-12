import React, { useState } from "react";
import Logo from "./Logo";
import Joi from "joi";
import Navbar from "./Navbar";
import axios from "axios";
import { CONSTANTS } from "../constants";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

type Props = {};

const Signup = (props: Props) => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const validateFormData = () => {
    const validation = schema.validate(formdata, { abortEarly: false });
    if (validation.error) {
      const newErrors: any = {};
      validation.error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
    return true;
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    if (validateFormData()) {
      // Form data is valid, proceed with submission
      try {
        const res = await axios.post(`${CONSTANTS.SERVERURL}/auth/register`, {
          firstname: formdata.firstname,
          lastname: formdata.lastname,
          email: formdata.email,
          password: formdata.password,
        });
        // console.log(res.data);
        navigate("/signin");
      } catch (error: any) {
        if (error?.response.status === 400) {
          toast.error(error.response.data.message, {
            hideProgressBar: true,
          });
        } else {
          toast.error("Something went wrong", { hideProgressBar: true });
        }
      } finally {
        setFormdata({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });
        setLoading(false);
      }
      // console.log("Form data is valid:", formdata);
    } else {
      // console.log("Form data is invalid");
      setLoading(false);
    }
  };
  const handlechange = (e: any) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer />

      <div className="flex flex-col gap-3 items-center justify-center bg-gradient-to-r from-[#6d7f9e] to-secondary min-h-screen py-[100px]">
        <div className="absolute top-0 left-0 w-full">
          <div className="h-[70px] bg-slate-700 flex items-center justify-between px-2 text-white">
            <Logo />
          </div>
        </div>
        <div className="flex text-white text-[1.4rem]">Register as a user</div>
        <div className="shadow-2xl flex flex-col gap-3 rounded-md p-[16px] border-white bg-white w-[400px]">
          <div className="flex flex-col gap-2">
            <label className="text-[14px]">Firstname</label>
            <input
              onChange={handlechange}
              name="firstname"
              type="text"
              value={formdata.firstname}
              className="rounded-md py-3 px-2 outline-0 border border-gray-500"
            />
            <span className="text-red-500 text-[12px]">
              {errors && errors.firstname}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[14px]">Lastname</label>
            <input
              onChange={handlechange}
              name="lastname"
              type="text"
              value={formdata.lastname}
              className="rounded-md py-3 px-2 outline-0 border border-gray-500"
            />
            <span className="text-red-500 text-[12px]">
              {errors && errors.lastname}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[14px]">Email</label>
            <input
              onChange={handlechange}
              name="email"
              value={formdata.email}
              type="text"
              className="rounded-md py-3 px-2 outline-0 border border-gray-500"
            />
            <span className="text-red-500 text-[12px]">
              {errors && errors.email}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px]">Password</label>
            <input
              onChange={handlechange}
              name="password"
              type="password"
              value={formdata.password}
              className="rounded-md py-3 px-2 outline-0 border border-gray-500"
            />
            <span className="text-red-500 text-[12px]">
              {errors && errors.password}
            </span>
          </div>
          <div className="flex gap-2 items-center text-[0.8rem] font-[500]">
            <p>Already have an account? </p>
            <Link to="/signin" className="text-teal-500 underline">
              Signin
            </Link>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-secondary w-full flex items-center justify-center rounded-md px-4 py-2 text-white font-[500] font-mont"
          >
            {!loading ? "Signup" : <div className="loader"></div>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
