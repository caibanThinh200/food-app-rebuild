import { Button, Layout, Modal, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { context } from "../Context/Context";
import { useParams } from "react-router-dom";
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

  const getUserInfoByParam = () => {
    fetch(API_URL + "/User/" + id)
      .then((res) => res.json())
      .then((json) => setUser(json.data));
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(info.file.originFileObj);

        setImageName(info.file.name);
        setImageURL(imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const showModal = () => {
    setModal(true);
  };
  const handleOk = async () => {
    console.log(image);
    const form = new FormData();

    form.append("file", image);

    axios
      .put(API_URL + "/User/profile/" + id, form, {
        header: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      });
    setModal(false);
    //console.log(form);
  };
  const handleCancel = () => {
    setModal(false);
  };

  useEffect(() => {
    getUserInfoByParam();
  }, [user]);

  return (
    <div className=" emp-profile">
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
            <form style={{ marginLeft: "10%" }} key={UserId} method="post">
              <div className="row">
                <div className="col-md-4">
                  <div className="profile-head">
                    <div className="profile-head profile-title ">
                      <div
                        style={{ width: "40%", height: "200px" }}
                        className="profile-img floatLeft"
                      >
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={ API_URL + "/images/" + avatar}
                        />
                        <Button
                          style={{ margin: "30px 80px" }}
                          onClick={() => {
                            showModal();
                          }}
                          type="primary"
                        >
                          Change photo
                        </Button>
                        <Modal
                          style={{ marginTop: "300px" }}
                          visible={modal}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            method="POST"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                          >
                            {imageURL ? (
                              <img
                                src={imageURL}
                                alt="avatar"
                                style={{ width: "100%" }}
                              />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                        </Modal>
                      </div>

                      <h5>{Fullname}</h5>
                    </div>
                    <div className="clear-both"></div>
                    <ul className=" nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item floatLeft">
                        <a
                          className="nav-link active"
                          id="home-tab"
                          data-toggle="tab"
                          href="#home"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="profile-tab"
                          data-toggle="tab"
                          href="#profile"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          Timeline
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-4">
                          <label>User Id</label>
                        </div>
                        <div className="col-md-6">
                          <p>{UserId}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label>Name</label>
                        </div>
                        <div className="col-md-6">
                          <p>{Fullname}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label>Email</label>
                        </div>
                        <div className="col-md-4">
                          <p>{Gmail}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                          <p>{phoneNum}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label>Profession</label>
                        </div>
                        <div className="col-md-4">
                          <p>Web Developer and Designer</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>Experience</label>
                        </div>
                        <div className="col-md-6">
                          <p>Expert</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Hourly Rate</label>
                        </div>
                        <div className="col-md-6">
                          <p>10$/hr</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Total Projects</label>
                        </div>
                        <div className="col-md-6">
                          <p>230</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>English Level</label>
                        </div>
                        <div className="col-md-6">
                          <p>Expert</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Availability</label>
                        </div>
                        <div className="col-md-6">
                          <p>6 months</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <label>Your Bio</label>
                          <br />
                          <p>Your detail description</p>
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
};
export default Profile;
