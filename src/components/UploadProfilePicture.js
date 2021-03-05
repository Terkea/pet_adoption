import React, { useState } from "react";
import { Upload, Typography } from "antd";
import ImgCrop from "antd-img-crop";

import { runNotifications } from "../helpers/Notification";

import uuid from "react-uuid";
import { storage } from "../createStore";

import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const { Title } = Typography;
const UploadProfilePicture = (props) => {
  const [fileList, updateFileList] = useState([]);
  const firebase = useFirebase();

  const customUpload = ({ onError, onSuccess, file }) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = storage.ref();
    const imageName = uuid(); //a unique name for the image
    const imgFile = storageRef.child(`avatar/${imageName}.jpg`);
    try {
      const image = imgFile.put(file, metadata);
      image.then((snapshot) => {
        onSuccess(null, image);
        firebase
          .updateProfile({
            photoURL: `${imageName}.jpg`,
          })
          .then(() => runNotifications("Profile image updated", "SUCCESS"));
      });
      onError(e);
    } catch (e) {
      
    }
  };

  const options = {
    fileList,
    showUploadList: false,
    onChange: (info) => {
      updateFileList(info.fileList.filter((file) => !!file.status));
    },
  };

  return (
    <ImgCrop rotate>
      <Upload customRequest={customUpload} {...options}>
        <Title level={4}>
          <Link to="#">Update profile picture</Link>
        </Title>
      </Upload>
    </ImgCrop>
  );
};

export default UploadProfilePicture;
