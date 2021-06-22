import { Bar, Line } from 'react-chartjs-2'
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/Context"
import axios from 'axios';
import { Statistic, Row, Col, Divider, Popconfirm, Modal, message } from "antd";

const Chart = () => {
    const { API_URL } = useContext(context),
        [isPopconfirm, setIsPopconfirm] = useState(false),
        [total, setTotal] = useState(0),
        [result, setResult] = useState(0),
        [kpi, setKPI] = useState([]),
        [isOpen, setIsOpen] = useState(false),
        currentMonth = new Date().getMonth() + 1;
    let totalPrice = 0;
    useEffect(() => {
        setResult(total / 50000000 * 100)
    }, [total])

    useEffect(() => {
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        if (Math.abs(today - lastDayOfMonth) <= 0) {
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
            })
    }

    const onModalCancel = () => {
        setIsOpen(false)
    }
    useEffect(() => {
        try {
            axios.get(API_URL + "/bill")
                .then(res => {
                    res.data.data.map(item => {
                        totalPrice += item.total
                    })
                    setTotal(totalPrice);
                });
            axios.get(API_URL + "/bill/kpi?year=2021")
                .then(res => setKPI(res.data.data))
        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <div className="container-fluid chart-component">
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
            <Popconfirm
                title={`Tháng ${new Date().getMonth()} đã hết, bạn muốn chốt sổ chứ`}
                visible={isPopconfirm}
                onConfirm={onConfirmOK}
                onCancel={onConfirmCancel}
            >
            </Popconfirm>
            <Row gutter={16}>
                <Col span={6}>
                    <div className="chart-item bg-white">
                        <Statistic title="Total" value={total} />
                    </div>
                </Col>
                <Col span={6}>
                    <div className="chart-item bg-white">
                        <Statistic title="Target" value={100000000} suffix="VND" />
                    </div>
                </Col>
                <Col span={6}>
                    <div className="chart-item bg-white">
                        <Statistic title="Month" value={currentMonth} />
                    </div>
                </Col>
                <Col span={6}>
                    <div className="chart-item bg-white">
                        <Statistic title="Percent" value={total/1000000} suffix="%" valueStyle={{color:'red'}} />
                    </div>
                </Col>
            </Row>
            <Divider />
            <h3>Monthly revenue chart</h3>
            <div className="row bg-white">
                <Bar
                    style={{ padding: '20px' }}
                    data={{
                        labels: kpi.sort((a, b) => a.month - b.month).map(item => "Tháng " + item.month),
                        datasets: [{
                            label: 'Bar chart ',
                            data: kpi.sort((a, b) => a.month - b.month).map(item => item.total),
                            backgroundColor: [
                                "#EBDEF0",
                                "#C39BD3",
                                "#AF7AC5",
                                "#D7BDE2",
                                "#F4D03F",
                                "#52BE80"
                            ],
                            borderWidth: 1
                        }]
                    }}
                    dataSet
                    height={400}
                    width={800}
                    options={{
                        maintainAspectratio: false
                    }}
                />
            </div>
        </div>
    )
}
export default Chart