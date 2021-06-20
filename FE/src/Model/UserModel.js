export default class UserModel {
    constructor(data = {}) {
        this.setData(data);
    }

    setData(data = {}) {
        this.UserId = data.UserId || "";
        this.Fullname = data.Fullname || "";
        this.UserAddress = data.UserAddress || "";
        this.Birth = data.Birth || "";
        this.Gmail = data.Gmail || "";
        this.Username = data.Username || "";
        this.Pass = data.Pass || "";
        this.phoneNum = data.phoneNum || "";
        this.avatar = data.avatar || "";
        this.role = data.role || "";
        this.created_at = data.Created_at || "";
        this.updated_at = data.updated_at || "";
    }

    getData () {
        return {...this}
    }
}