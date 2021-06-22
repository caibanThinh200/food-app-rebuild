export default class ListBillModel {
    constructor(data = []) {
        this.setData(data)
    }

    setData(data = []) {
        this.result = this.generateListBill(data);
    }

    generateListBill(data = []) {
        if(data.length > 0) {
            return data.map(bill => new BillModel(bill).getBill())
        }
    }

    getListBill() {
        return {...this};
    }
}

export class BillModel {
    constructor(data = {}) {
        this.setData(data)
    }

    setData(data = {}) {
        this.idBill = data.idBill || "";
        this.address = data.address || "";
        this.idUser = data.idUser || "";
        this.note = data.note || "";
        this.phone = data.phone || "";
        this.total = data.total || "";
        this.created_at = data.created_at || "";
    }

    getBill() {
        return {...this};
    }
}