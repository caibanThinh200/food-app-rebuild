export default class ProductListModel {
    constructor(data = {}) {
        this.setData(data);
    }

    setData(data) {
        this.result = this.getProducts(data) || [];
    }

    getProducts(data = []) {
        if(data.length >  0){
            return data.map(product => new ProductModel(product).getProduct());
        }
    }
    
    getListProduct() {
        return {...this}
    }
}

export class ProductModel {
    constructor(data = {}) {
        this.setData(data);
    }

    setData(data) {
        this.nameFood = data.nameFood || "";
        this.cateName = data.cateName || "";
        this.count = data.count || "";
        this.description = data.description || "";
        this.foodAddress = data.foodAddress || "";
        this.idCategory = data.idCategory || "";
        this.idProduct = data.idProduct || "";
        this.image = data.image || "";
        this.saled = data.saled || "";
        this.price = data.price || "";
        this.created_at = data.created_at || "";
        this.updated_at = data.updated_at || "";
    }

    getProduct() {
        return {...this}
    }
}