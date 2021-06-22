import { Button, Layout, Modal, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { context } from "../Context/Context";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";

const { Header, Footer, Sider, Content } = Layout;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const Profile = () => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState([]);
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageName, setImageName] = useState("");
  const { API_URL } = useContext(context);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log(imageURL);
  const getUserInfoByParam = () => {
    fetch(API_URL + "/User/" + id)
      .then((res) => res.json())
      .then((json) => setUser(json.data));
  };
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const showModal = () => {
    setModal(true);
  };
  const handleOk = async () => {
    const form = new FormData();
    form.append("file", imageURL, imageURL.name);
    form.forEach(element => {
      console.log(element);
    });
    axios
      .put(API_URL + "/User/profile/" + id, form, {
        header: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        getUserInfoByParam();
        setImageURL("");
        console.log(res);
      });
    setModal(false);
    //console.log(form);
  };
  const handleCancel = () => {
    setModal(false);
    setImageURL("")
  };
  useEffect(()=>{

  },[localStorage.getItem("token")])
  useEffect(() => {
    getUserInfoByParam();
  }, [JSON.stringify(user)]);
  if(localStorage.getItem("token"))
  return (
    <div className="container emp-profile">
      {id ? (
        user.map(
          ({
            UserId,
            Fullname,
            UserAddress,
            Birth,
            Gmail,
            phoneNum,
            Username,
            Pass,
            Created_at,
            avatar,
          }) => (
              <form className="container-fluid" key={UserId} method="post">
                <div className="row">
                  <div className="col-md-4">
                    <div className="profile-head">
                      <div
                        className="profile-img"
                      >
                        <img
                          src={API_URL + "/images/" + avatar}
                        />
                        <div className="btn-avatar-container">
                        <h3 style={{margin:'20px 0'}}>{Fullname}</h3>
                        <Button
                          onClick={() => {
                            showModal();
                          }}
                          type="default"
                        >
                          Change photo
                        </Button>
                        </div>
                        <Modal
                          visible={modal}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <input type="file" onChange={(e) => setImageURL(e.target.files[0])} />
                          {imageURL && imageURL.name}
                        </Modal>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 bg-light">
                    <div className="customer-infor p-2">
                      <h4>Customer Information</h4>
                      <h5 id="email"><span className="text-primary">({Gmail})</span></h5>
                      <div className="alert alert-secondary mt-3" role="alert">
                          Create at: {Created_at}
                      </div>
                      <div>
                        <div className="user-infor">
                          <div className="row">
                            <div className="col-3">
                              <h5>Fullname:</h5>
                            </div>
                            <div className="col-9">
                                <h5>{Fullname}</h5>
                            </div>
                          </div>
                        </div>
                        <div className="user-infor">
                        <div className="row">
                            <div className="col-3">
                              <h5>Phone number:</h5>
                            </div>
                            <div className="col-9">
                                <h5>0{phoneNum}</h5>
                            </div>
                          </div>
                        </div>
                        <div className="user-infor">
                        <div className="row">
                            <div className="col-3">
                              <h5>Address:</h5>
                            </div>
                            <div className="col-9">
                                <h5>{UserAddress}</h5>
                            </div>
                          </div>
                        </div>
                        <div className="user-infor">
                        <div className="row">
                            <div className="col-3">
                              <h5>Birthdate:</h5>
                            </div>
                            <div className="col-9">
                                <h5>{Birth}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )
        )
      ) : (
          <div>
            <h1>You have logout , please sign in</h1>
          </div>
        )}
    </div>
  );
  else return <Redirect to="/"/>
};
export default Profile;
