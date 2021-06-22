export default class AuthModel {
    constructor(data = {}) {
        this.setData(data);
    }

    setData(data = {}) {
        this.UserId = data.UserId || "";
        this.Fullname = data.fullname || "";
        this.UserAddress = data.address || "";
        this.Birth = data.birth || "";
        this.Gmail = data.mail || "";
        this.username = data.username || "";
        this.pass = data.password || "";
        this.PhoneNum = data.phoneNum || "";
    }

    getData () {
        return {...this}
    }

}