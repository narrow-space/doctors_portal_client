import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth, { storage } from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Shared/Loader";

import useToken from "../../Hooks/useToken";
import axios from "axios";
import { Line, Circle } from 'rc-progress';
import Swal from "sweetalert2";

const Register = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [percentage, setPercentage] = useState();
  const [updateProfile, updating] = useUpdateProfile(auth);

  const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const [token] = useToken(user || gUser);

 

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange", // I want to change it to onBlur
  });
  const { isValid, errors } = formState;

  const handleimagechange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const uploadImage = () => {
      // const name = new Date().getTime + image.name

      const storageRef = ref(storage, `/images/${Date.now()}${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {

          
          const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);

            setPercentage(0);
          });
        }
      );
    };
    image && uploadImage();
  }, [image]);

  let singninErrors;

  if (error?.message === "Firebase: Error (auth/email-already-in-use).") {
    singninErrors = (
      <div
        className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
        role="alert"
      >
        Email already Exsist
      </div>
    );
    console.log(error.message);
  }

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      photoURL: url,
    };
    console.log(userInfo);
    
    await createUserWithEmailAndPassword(data.email, data.password, data.name);

    await updateProfile({ displayName: data.name, photoURL: url });
   
    axios.put('https://dry-falls-30654.herokuapp.com/alluserinfo',userInfo).then((res)=>{
      const data=res.data;
      console.log(data);
    })
    
  };

  useEffect(() => {
    if (token) {
      navigate("/appiontment");

      // window.location.reload();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registration Successfully',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar:"true"
      });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      navigate("/appiontment");
    }
  }, [token, navigate]);

  if (error) {
    console.log(error.message);
  }

  if (loading || gLoading || updating) {
    return <Loader />;
  }

  const handleImgsavefromLocalStorage = async() => {
    localStorage.setItem("photoURL", url);
    
  };

   if(gUser){
    const gUserinfo={
      name: gUser?.user?.displayName,
      email: gUser?.user?.email,
      photoURL: gUser?.user?.photoURL,
 
     }
     
 
      axios.put('https://dry-falls-30654.herokuapp.com/alluserinfo',gUserinfo).then((res)=>{
      const data=res.data;
      console.log(data);
    })
   }

  return (
    <div className="flex justify-center items-center ">
      <div className="card w-96   dark:text-white shadow-2xl">
        <div className="card-body">
          <div className="flex flex-col w-full border-opacity-50">
            <h1 className="text-xl text-center">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-text dark:text-white">Name</span>
                </label>
                <input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full max-w-xs dark:text-black"
                />

                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-text dark:text-white">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email Adress is required",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "please enter a valid email adress",
                    },
                  })}
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs dark:text-black"
                />

                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs ">
                <label className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "password must be 6 character or long",
                    },
                  })}
                  type="password"
                  placeholder="Your password"
                  className="input input-bordered w-full max-w-xs dark:text-black"
                />

                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              <label className="label">Upload Your Avatar</label>
              <div className="w-full bg-gray-200 rounded-full">
                {/* {percentage === 0 && (
                  <div
                    className="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3"
                    role="alert"
                  >
                    Image Uploading please wait
                  </div>
                )}
                {percentage === 100 && url && (
                  <div
                    className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3"
                    role="alert"
                  >
                    img Uploading:{percentage}% Successfully
                  </div>
                )} */}

                {percentage > 0 && percentage <= 100 ? (
                   <Line percent={percentage} strokeWidth={4} strokeColor="#0FCFEC" />
                ) : null}
              </div>
              <div className="flex justify-center">
                <div className="mb-3 w-96 ">
                  <input
                    onChange={handleimagechange}
                    className="form-control block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="file"
                    id="formFile"
                  />
                </div>
                <div></div>
              </div>
              {singninErrors}

              <button
                onClick={handleImgsavefromLocalStorage}
                disabled={
                  !isValid || !url
                }
                type="submit"
                className={`btn dark:btn-close-white w-full max-w-xs ${
                  percentage > 0 && percentage <= 100 ? "loading" : null
                }`}
              >
                {` ${
                  percentage > 0 && percentage <= 100
                    ? "Img uploading..."
                    : "Signup"
                }`}
              </button>
            </form>

            <p className="font-semibold ">
              <small>
                already have an account ?
                <Link className="text-secondary mx-2" to="/login">
                  Please login
                </Link>
              </small>
            </p>
            <div className="divider">OR</div>
            <button
              onClick={
                () => {
                  signInWithGoogle();
                  // sendgUserInfo()
                }
              
              }
              className="btn dark:btn-close-white btn-outline"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
