import React, { useEffect, useState } from "react";
import { notification } from "antd";
import axios from "axios";
import { useJwt } from "react-jwt";
import { SmileOutlined } from "@ant-design/icons";

import Loading from "../Component/Loading";
import { reduce } from "lodash";
import AuthModel from "../Model/AuthModel";
import ProductListModel from "../Model/ProductModel";
import CategoryListModel from "../Model/CategoryModel";
import ListBillModel from "../Model/BillModel";
import UserModel from "../Model/UserModel";

export const context = React.createContext();
export const ContextProvider = (props) => {
  // const API_URL = "http://localhost:3010";
  const API_URL = "http://108.160.134.9:3010";
  const DEV_URL = "http://localhost:3010";
  const [isLoading, setIsLoading] = useState(true);
  const tokenLocal = JSON.parse(localStorage.getItem("token")) || "";
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
        let dataUser = new AuthModel({
          fullname,
          birth,
          mail,
          address,
          phoneNum,
          username,
          password,
        }).getData();
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

    let dataUser = new AuthModel({ username, password }).getData();
    //console.log(dataUser);
    axios.post(API_URL + "/User/login", dataUser).then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data));
        setToken(res.data.token);
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
      .then((json) => {
        setCate(new CategoryListModel(json).getListCategory().result);
      });
  };
  //Product
  const [product, setProduct] = useState([]);
  const [bestSaled, setBestSaled] = useState([]);
  const [detail, setDetail] = useState([]);
  const getProduct = () => {
    fetch(API_URL + "/Home")
      .then((res) => res.json())
      .then((json) => {
        const productList = new ProductListModel(json).getListProduct();
        setProduct(productList);
        setIsLoading(false);
      });
  };
  const getBestSaledProduct = () => {
    setIsLoading(true);
    fetch(API_URL + "/Home/b/bestSaled")
      .then((res) => res.json())
      .then((json) => {
        setBestSaled(new ProductListModel(json.data).getListProduct().result);
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
      .then((json) => {
        const product = new ProductListModel(json).getListProduct();
        setDetail(product.result[0]);
      });
  };
  //HInh ben may NC roi nen ko co, m vua lam gi ma no co data vaym ghi localhost thua dau / t goi api co dau /roingon
  //Cart
  const checkDuplicateProduct = (pos) => {
    notification.open({
      message: "Duplicate product",
      description: "You have already have this product in cart",
    });
  };
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(1);

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
  const [userInf, setUserInf] = useState({});
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
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const { isExpired, decodedToken, reEvaluateToken } = useJwt(token);

  useEffect(() => {
    reEvaluateToken(token);
    console.log(decodedToken, isExpired);
  }, [token]);

  const onChangeSearch = (e) => {
    if (e.target.value !== "") {
      setTimeout(() => {
        document.getElementsByClassName("search-input")[0].style.top = "0px";
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
    const search_string = search.trim().toLowerCase();
    setIsLoadingResult(true);
    axios
      .get(API_URL + "/Home")
      .then((res) => {
        if (search_string.length > 0) {
          const result = res.data.filter((item) => {
            return item.nameFood.toLowerCase().match(search_string);
          });
          const data = new ProductListModel(result).getListProduct();
          setProductFilled(data.result);
        }
      })
      .then(() => setIsLoadingResult(false))
      .catch(() => setIsLoading(false));
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
          const data = item.nameFood.toLowerCase().match(search_string);
          return new ProductListModel(data).getListProduct();
        });
        console.log(result);
        setProductFilled(result);
      }
    });
  };
  const getUserInfo = () => {
    if (token || tokenLocal.token) {
      console.log(decodedToken, isExpired);
      if (!isExpired) {
        fetch(API_URL + "/User/s/userprofile", {
          headers: {
            Authorization: "Bearer " + tokenLocal.token,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            setUserInf(new UserModel(json[0]).getData());
          });
      } else if (isExpired) {
        alert("Token expired,please login again");
        showModal();
      }
    }
  };

  //Bill
  const [bill, setBill] = useState([]);
  const [userId, setUserId] = useState("");
  const [loadingBill, setLoadingBill] = useState(false);

  const getBillAndUser = () => {
    if (userInf) {
      axios.get(API_URL + "/Bill/u/" + userInf.UserId).then((res) => {
        setBill(new ListBillModel(res.data.data).getListBill().result);
      });
    }
  };

  const store = {
    //constant state
    API_URL,
    isLoading,
    setIsLoading,
    isLoadingResult,
    setIsLoadingResult,
    //user state
    tokenLocal,
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
    getUserInfo,
    //bill
    getBillAndUser,
    bill,
    userInf,
    setUserInf,
    userId,
  };

  return (
    <context.Provider value={store}>
      {/* {isLoading && <Loading />} */}
      {props.children}
    </context.Provider>
  );
};
