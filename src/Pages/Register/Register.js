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

import { toast } from "material-react-toastify";
import useToken from "../../Hooks/useToken";
import axios from "axios";
const Register = () => {
  
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [percentage, setPercentage] = useState(0);
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
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            localStorage.setItem("photoURL",downloadURL)
            setPercentage(0);
          });
        },
       
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
    await createUserWithEmailAndPassword(data.email, data.password, data.name);
    
    await updateProfile({ displayName: data.name, photoURL: url });
    const userInfo={
      name:data.name,
      email:data.email,
      photoURL:url
    }

    axios.post("https://stormy-tundra-64733.herokuapp.com/alluserlist", userInfo).then(
      (res) => {
        const data = res.data;
        console.log(data);
       
      },

      (error) => {
        console.log(error);
      }
    );
    

   
  };

  useEffect(() => {
    if (token) {
      navigate("/appiontment");

      // window.location.reload();
      toast.success("User Registration Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
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

  return (
    <div className="flex justify-center items-center ">
      <div className="card w-96  dark:bg-slate-900 dark:text-white shadow-2xl">
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

                {percentage === 0 ? null : (
                 <div class=" bg-gray-200 rounded-full">
                 <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width:`${percentage}%`}}>{`Img Uploading${percentage}%`}</div>
               </div>
                )}
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
                disabled={!isValid || !url}
                type="submit"
                className="btn dark:btn-close-white w-full max-w-xs"
              >
                Signup
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
              onClick={() => signInWithGoogle()}
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
