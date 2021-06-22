import { Fragment, useContext, useEffect, useState } from "react";
import { Alert, Divider, message, Modal, Table } from "antd";
import axios from "axios";
import { context } from "../../Context/Context"
import { Descriptions } from "antd";

const BillTable = (props) => {
    const [bill, setBill] = useState([]),
        { API_URL, DEV_URL } = useContext(context),
        { Column } = Table
    const [visible, setVisible] = useState(false)
    const [food, setFood] = useState([])
    const [billDetail, setBillDetail] = useState({})
    useEffect(() => {
        axios.get(API_URL + "/bill")
            .then(res => {
                setBill(res.data.data)
            });
    }, [])
    const handleViewDetail = (data) => {
        setBillDetail(data)
        setVisible(true)
        // Dont call api again
        if (data.idBill !== billDetail.idBill) {
            console.log("call")
            axios.get(API_URL + "/bill/p/" + data.idBill)
                .then(res => {
                    console.log(res.data.data)
                    setFood(res.data.data)
                })
        }
    }

    return (
        <Fragment>
            <Modal width={1000} visible={visible} footer={false} title="Bill Detail" onCancel={() => setVisible(false)}>
                <Descriptions bordered>
                    <Descriptions.Item label="Phone number">{billDetail.phone}</Descriptions.Item>
                    <Descriptions.Item label="Note" span={2}>
                        {billDetail.note}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>
                        {billDetail.address}
                    </Descriptions.Item>
                    {food.length && food.map(item => (
                        <>
                            <Descriptions.Item label="Food name" span={2}>{item.nameFood}</Descriptions.Item>
                            <Descriptions.Item label="Quantity">{item.count}</Descriptions.Item>
                        </>
                    ))}
                    <Descriptions.Item label="Total Price">
                        <h6 className="mb-0">{new Intl.NumberFormat().format(billDetail.total)} VND</h6>
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
            <Table dataSource={bill} bordered>
                <Column title="ID Bill" dataIndex="idBill" key="idBill" ellipsis={true} />
                <Column title="Total Price" key="total" render={data => (
                    <span> {new Intl.NumberFormat().format(data.total)} VND</span>
                )}
                />
                <Column title="Note" dataIndex="note" key="note" />
                <Column title="Customer Address" dataIndex="address" key="address" />
                <Column title="Date" dataIndex="created_at" key="created_at" />
                <Column title="Action" key="action" width="152px"
                    render={action => (
                        <div className="d-flex">
                            <button onClick={() => handleViewDetail(action)} className="btn-detail">Detail</button>
                        </div>
                    )} />
            </Table>
        </Fragment>
    )
}

export default BillTable;