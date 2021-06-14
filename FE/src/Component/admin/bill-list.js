import { Fragment, useContext, useEffect, useState } from "react";
import { Alert, Divider, message, Modal, Table } from "antd";
import axios from "axios";
import { context } from "../../Context/Context"
import { Statistic, Row, Col, Button, Popconfirm } from "antd";

const BillTable = (props) => {
    const [bill, setBill] = useState([]),
    [fullname, setFullname] = useState(""),
    [total, setTotal] = useState(0),
    [result, setResult] = useState(0),
    [isOpen, setIsOpen] = useState(false),
    [isPopconfirm, setIsPopconfirm] = useState(false),
    { API_URL } = useContext(context),
    { Column } = Table,
    currentMonth = new Date().getMonth();
    let totalPrice = 0;

    useEffect(() => {
        axios.get(API_URL + "/bill")
        .then(res => {
            res.data.data.map(item => {
                totalPrice += item.total
            })
            setTotal(totalPrice);
            setBill(res.data.data)
        });
    }, [])

    useEffect(() => {
        setResult(total/50000000 * 100)
    }, [total])

    useEffect(() => {
            const today = new Date();
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
            if(Math.abs(today - lastDayOfMonth) <= 0) {
            setIsPopconfirm(true); 
        }
    }, [])

    const onConfirmOK = () => {
        setIsPopconfirm(false);
        setIsOpen(true);
    }

    const onConfirmCancel = () => {
        setIsPopconfirm(false);
    }

    const onModalOk = () => {
        const KPIResult = {
            total: total || 0,
            result: result || 0
        }
        axios.post(API_URL + "/Bill/KPI", KPIResult)
        .then(res => {
            console.log(res);
            message.success("Chốt sổ thành công")
            setIsOpen(false);
            setBill([])
        })
    }

    const onModalCancel = () => {
        setIsOpen(false)
    }

    return (
        <Fragment>
            <h3>Danh sách hóa đơn theo tháng</h3>
            <Popconfirm
                title={`Tháng ${new Date().getMonth()} đã hết, bạn muốn chốt sổ chứ`}
                visible={isPopconfirm}
                onConfirm={onConfirmOK}
                onCancel={onConfirmCancel}
            >
            </Popconfirm>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Tổng doanh thu" value={total} />
                </Col>
                <Col span={12}>
                    <Statistic title="Tháng hiện tại" value={currentMonth} precision={2} />
                </Col>
            </Row>
            <Divider/>

            <Table dataSource={bill} bordered>
                <Column title="Mã hóa đơn" dataIndex="idBill" key="idBill" />
                <Column title="Mã khách hàng" dataIndex="idUser" key="idUser"/>
                <Column title="Tổng tiền" dataIndex="total" key="total"/>
                <Column title="Ghi chú" dataIndex="note" key="note"/>
                <Column title="Địa chỉ giao" dataIndex="address" key="address"/>
                <Column title="Action" key="action" width="152px" 
                    render={action => (
                        <div className="d-flex">
                            <button className="btn-detail">Detail</button>
                            <button className="btn-edit">Edit</button>
                        </div>
                    )}/>
                <Column title="Ngày thanh toán" dataIndex="created_at" key="created_at"/>
            </Table>
            <Modal 
                visible={isOpen}
                onOk={onModalOk}
                onCancel={onModalCancel}
            >
                <div className="container">
                    <h2>Bảng chốt sổ</h2>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic title="Tổng doanh thu" value={total} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Tháng hiện tại" value={currentMonth} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Target" value={50000000} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Chỉ tiêu đạt được" value={result + "%"} />
                        </Col>
                    </Row>
                </div>
            </Modal>
        </Fragment>
    )
}

export default BillTable;