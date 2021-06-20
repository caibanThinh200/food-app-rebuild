export default class CategoryListModel {
    constructor(data = {}) {
        this.setData(data)
    }

    setData(data = []) {
        this.result = this.generateListCategory(data) || [];
    }

    generateListCategory(data = []) {
        return data.map(cate => new CategoryModel(cate).getCategory())
    }

    getListCategory() {
        return {...this};
    }
}

export class CategoryModel {
    constructor(data = {}) {
        this.setData(data);
    }
    
    setData(data) {
        this.idCategory = data.idCategory;
        this.nameCategory = data.nameCategory;
        this.icon = data.icon;
    }

    getCategory() {
        return {...this};
    }
}