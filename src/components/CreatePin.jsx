import React from "react";
import { useState } from "react";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { BsPinAngle } from "react-icons/bs";
import Swal from "sweetalert2";

import Spinner from "./Spinner";
import { client } from "../client";
import { categories } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNew } from "../rtk/slices/pinsSlice";

const CreatePin = () => {
  const [imageAsset, setImageAsset] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);
  const [title, setTitle] = useState(null);
  const [about, setAbout] = useState(null);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("cars");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const uploadImage = (image) => {
    setImageUpload(true);
    client.assets
      .upload("image", image, {
        contentType: image?.type,
        filename: image?.name,
      })
      .then((image) => {
        setImageAsset(image);
        setImageUpload(false);
      });
  };

  const publishPin = (e) => {
    e.preventDefault();
    const doc = {
      _type: "pin",
      title,
      about,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      userId: user._id,
      postedBy: {
        userId: user._id,
        userName: user?.userName,
        image: user?.image,
      },
      category,
    };

    client.create(doc).then((data) => {
      console.log(data);
      dispatch(addNew(data));
      Swal.fire({
        title: "Published!",
        text: "Your Pin Published Check It Now",
        imageUrl: `${imageAsset?.url}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      navigate("/");
    });
  };

  return (
    <div className="w-full flex flex-col p-4 justify-center">
      <form onSubmit={(e) => publishPin(e)}>
        <div className="flex w-full justify-center items-center flex-row flex-wrap">
          {imageUpload ? (
            <Spinner message={"Uploading..."} />
          ) : !imageAsset ? (
            <label>
              <div className="flex flex-1 h-full flex-col rounded-lg m-4 p-5 justify-center items-center bg-gray-200">
                <HiOutlineCloudUpload fontSize={25} className="mb-5" />
                <p>Upload Pin Image</p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="w-0 h-0"
                required
                onChange={(e) => {
                  uploadImage(e.currentTarget.files[0]);
                }}
              />
            </label>
          ) : (
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={imageAsset?.url}
                className="max-w-xl"
                alt="uploaded_image"
              />
              <button
                onClick={() => setImageAsset(null)}
                className="bg-mainOrange hover:bg-transparent duration-100 border-2 border-orange-600 hover:text-mainOrange text-white absolute bottom-3 left-3 w-8 h-8 rounded-full flex justify-center items-center"
              >
                <MdDeleteForever fontSize={20} />
              </button>
            </div>
          )}
          <div className="w-full flex flex-col justify-center items-center">
            <input
              type="text"
              className="w-2/5 my-3 border-b-2 text-xl border-gray-300 bg-transparent focus:outline-none"
              required
              placeholder="Enter Pin Title"
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <input
              type="text"
              className="w-2/5 my-3 border-b-2 text-xl border-gray-300 bg-transparent focus:outline-none"
              required
              placeholder="What Is Your Pin About?"
              onChange={(e) => setAbout(e.currentTarget.value)}
            />
            <div className="w-full flex justify-center items-center">
              <p className="text-xl text-gray-400">Select a category: </p>
              <select
                required
                onChange={(e) => setCategory(e.currentTarget.value)}
                className="p-1 m-3 capitalize bg-transparent border-b-2 border-gray-300"
              >
                {categories.map((category) => (
                  <option
                    value={category?.name}
                    key={category.name}
                    className="capitalize"
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-5">
          <button
            type="submit"
            className="bg-mainOrange hover:bg-transparent duration-100 border-2 border-orange-600 hover:text-mainOrange text-white rounded-full p-2 flex justify-center items-center"
          >
            Publish Pin <BsPinAngle fontSize={20} className="font-bold ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePin;
