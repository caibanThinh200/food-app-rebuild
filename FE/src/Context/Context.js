import React, { useEffect, useState } from "react";
import { notification } from "antd";
import axios from "axios";

import { SmileOutlined } from "@ant-design/icons";

import Loading from "../Component/Loading";
import { reduce } from "lodash";

export const context = React.createContext();
export const ContextProvider = (props) => {
  const API_URL = "http://localhost:3010";
  const [isLoading, setIsLoading] = useState(true);
  //Register

  const [fullname, setFullname] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorFullname, setErrorFullname] = useState(true);
  const [errorBirth, setErrorFBirth] = useState(true);
  const [errorPhoneNum, setErrorPhoneNum] = useState(true);
  const [errorAddress, setErrorAddress] = useState(true);
  const [errorsMail, setErrorMail] = useState(true);
  const [errorUsername, setErrorUsername] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorLogin, setErrorLogin] = useState(false);
  const onChangeBirth = (date) => {
    setBirth(date._d.toString().slice(0, 15));
    if (date !== "") {
      setErrorFBirth(false);
    } else {
      setErrorFBirth(true);
    }
  };

  const onChangeFullName = (e) => {
    const name = e.target.value;
    if (name !== "") {
      setErrorFullname(false);
      setFullname(name);
    } else {
      setErrorFullname(true);
    }
  };
  const onChangePhoneNum = (e) => {
    const number = e.target.value;
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (!vnf_regex.test(number)) {
      setErrorPhoneNum(true);
    } else {
      setErrorPhoneNum(false);
    }
    setPhoneNum(number);
  };
  const onChangeAddress = (e) => {
    const addr = e.target.value;
    if (addr !== "") {
      setErrorAddress(false);
      setAddress(addr);
    } else {
      setErrorAddress(true);
    }
  };
  const onChangeMail = (e) => {
    const email = e.target.value;

    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (re.test(email)) {
      setErrorMail(false);
      setMail(email);
    } else {
      setErrorMail(true);
    }
  };
  const onChangeUsername = (e) => {
    const username = e.target.value;
    if (username !== "") {
      setErrorUsername(false);
      setUsername(username);
    } else {
      setErrorAddress(true);
    }
  };
  const onChangePassword = (e) => {
    const pass = e.target.value;
    if (username !== "") {
      setErrorPassword(false);
      setPassword(pass);
    } else {
      setErrorPassword(true);
    }
  };

  const onNotification = (message) => {
    notification.open({
      message: "Error",
      description: message,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const validateNotification = {
    fullnameNTF: {
      message: "Invalid fullname",
    },
    birthNTF: {
      message: "Invalid birth",
    },
    mailNTF: {
      message: "Invalid mail",
    },
    addressNTF: {
      message: "Invalid address",
    },
    phoneNumNTF: {
      message: "Invalid phoneNum,",
    },
    usernameNTF: {
      message: "Invalid username",
    },
    passwordNTF: {
      message: "Invalid password",
    },
    successNTF: {
      message: "Register success,from now on this is your account",
    },
  };
  const {
    fullnameNTF,
    birthNTF,
    mailNTF,
    addressNTF,
    phoneNumNTF,
    usernameNTF,
    passwordNTF,
    successNTF,
  } = validateNotification;

  const submitData = (e) => {
    e.preventDefault();
    switch (true) {
      case errorFullname:
        onNotification(fullnameNTF.message);
        break;
      case errorBirth:
        onNotification(birthNTF.message);
        break;
      case errorsMail:
        onNotification(mailNTF.message);
        break;
      case errorAddress:
        onNotification(addressNTF.message);
        break;
      case errorPhoneNum:
        onNotification(phoneNumNTF.message);
        break;
      case errorUsername:
        onNotification(usernameNTF.message);
        break;
      case errorPassword:
        onNotification(passwordNTF.message);
        break;
      default:
        let dataUser = {
          Fullname: fullname,
          UserAddress: address,
          Birth: birth,
          Gmail: mail,
          username: username,
          pass: password,
          PhoneNum: phoneNum,
        };
        setTimeout(() => {
          notification.open({
            message: "Register success",
            description: "From now on this is your account",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          });
        }, 2000);
        fetch(API_URL + "/User", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUser),
        });
    }
  };

  //Login
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const submitLogin = (e) => {
    e.preventDefault();

    let dataUser = {
      username: username,
      pass: password,
    };
    //console.log(dataUser);
    axios.post(API_URL + "/User/login", dataUser).then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data));

        setVisible(false);
        notification.open({
          style: { marginTop: "100px" },
          message: "Login success",
          description: "Welcome to uber eats",
        });
        window.location = "/";
      } else {
        setErrorLogin(true);
      }
    });
  };

  //Category
  const [cate, setCate] = useState([]);
  const getCate = () => {
    fetch(API_URL + "/Cate")
      .then((res) => res.json())
      .then((json) => setCate(json));
  };
  //Product
  const [product, setProduct] = useState([]);
  const [bestSaled, setBestSaled] = useState([]);
  const [detail, setDetail] = useState([]);
  const getProduct = () => {
    fetch(API_URL + "/Home")
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setIsLoading(false);
      });
  };
  const getBestSaledProduct = () => {
    fetch(API_URL + "/Home/b/bestSaled")
      .then((res) => res.json())
      .then((json) => {
        setBestSaled(json.data);
        setIsLoading(false);
      })
      .catch(() => {
        setProduct([]);
        setIsLoading(false);
      });
  };
  const getProductByCateId = (id) => {
    setIsLoading(true);
    fetch(API_URL + "/Home/" + id)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setIsLoading(false);
      })
      .catch(() => {
        setProduct([]);
        setIsLoading(false);
      });
  };

  const getDetailProduct = (id) => {
    fetch(API_URL + "/Home/idFood/" + id)
      .then((res) => res.json())
      .then((json) => setDetail(json));
  };

  //Cart
  const checkDuplicateProduct = (pos) => {
    notification.open({
      message: "Duplicate product",
      description: "You have already have this product in cart",
    });
  };
  const [cart, setCart] = useState([]);
  //const [count,setCount] = useState(1);

  const addCart = (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const check = cart.every((item) => {
        return item.idProduct !== id;
      });

      if (check) {
        const cart_product = product.filter((product) => {
          return product.idProduct === id;
        });

        setCart([...cart, ...cart_product]);
        notification.open({
          message: "Success",
          description: "Product is now in your cart, let 's check it",
        });
      } else {
        checkDuplicateProduct();
      }
    } else {
      alert("You dont have account, please login!! ");
      showModal();
    }
  };

  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) setCart(dataCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("dataCart", JSON.stringify(cart));
  }, [cart]);
  //navbar
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Login");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const [productFilled, setProductFilled] = useState([]);
  const onChangeSearch = (e) => {
    if (e.target.value !== "") {
      setTimeout(() => {
        document.getElementsByClassName("search-input")[0].style.top = "-100px";
      }, 500);

      setTimeout(() => {
        document.getElementsByClassName(
          "search-result-container"
        )[0].style.display = "block";
      }, 1000);
    } else if (e.target.value === "") {
      document.getElementsByClassName("search-input")[0].style.top = "0";
      document.getElementsByClassName(
        "search-result-container"
      )[0].style.display = "none";
    }
    setSearch(e.target.value);
  };

  const searchAction = () => {
    setIsLoading(true);
    const search_string = search.trim().toLowerCase();

    if (search_string !== "") {
      axios.get(API_URL + "/Home").then((res) => {
        const result = res.data.filter((item) => {
          return item.nameFood.toLowerCase().match(search_string);
        });

        setProduct(result);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      notification.open({
        message: "Please input saerch keyword",
      });
    }
  };
  const searchOnResult = (id) => {
    setIsLoading(true);
    axios.get(API_URL + "/Home").then((res) => {
      const result = res.data.filter((item) => {
        return item.idProduct === id;
      });
      setProduct(result);
      setSearch("");
      document.getElementsByClassName("ant-input-lg")[0].value = "";
      setIsLoading(false);
    });
  };
  const productFilter = (search) => {
    const search_string = search.trim().toLowerCase();

    axios.get(API_URL + "/Home").then((res) => {
      if (search_string.length > 0) {
        const result = res.data.filter((item) => {
          return item.nameFood.toLowerCase().match(search_string);
        });
        setProductFilled(result);
      }
    });
  };
  const store = {
    //constant state
    API_URL,
    isLoading,
    setIsLoading,
    //user state
    token,
    setToken,
    fullname,
    birth,
    username,
    password,
    phoneNum,
    address,
    mail,
    errorFullname,
    errorBirth,
    errorUsername,
    errorPhoneNum,
    errorPassword,
    errorAddress,
    errorsMail,
    errorLogin,
    onChangeFullName,
    onChangeBirth,
    onChangeUsername,
    onChangePassword,
    onChangePhoneNum,
    onChangeAddress,
    onChangeMail,
    submitData,
    submitLogin,
    //Category
    cate,
    getCate,
    //Product
    product,
    setProduct,
    detail,
    bestSaled,
    getProduct,
    getBestSaledProduct,
    getProductByCateId,
    getDetailProduct,
    productFilled,
    setProductFilled,
    productFilter,
    onChangeSearch,
    searchAction,
    searchOnResult,
    search,
    setSearch,
    //cart
    cart: [cart, setCart],
    addCart,
    //navbar
    visible,
    setVisible,
    confirmLoading,
    setConfirmLoading,
    modalText,
    setModalText,
    showModal,
    handleCancel,
    handleOk,
  };

  return (
    <context.Provider value={store}>
      {isLoading && <Loading />}
      {props.children}
    </context.Provider>
  );
};
