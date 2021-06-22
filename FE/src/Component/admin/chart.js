import { Bar, Line, Pie } from 'react-chartjs-2'
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/Context"
import axios from 'axios';
import { Statistic, Row, Col, Divider, Popconfirm, Modal, message, Skeleton } from "antd";

const Chart = () => {
    const { API_URL } = useContext(context),
        [isPopconfirm, setIsPopconfirm] = useState(false),
        [total, setTotal] = useState(0),
        [result, setResult] = useState(0),
        [kpi, setKPI] = useState([]),
        [isOpen, setIsOpen] = useState(false),
        currentMonth = new Date().getMonth() + 1;
    const [product, setProduct] = useState([])
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
            axios.get(API_URL + "/home")
                .then(res => {
                    const filter = res.data.sort((a, b) => b.saled - a.saled).slice(0, 5)
                    setProduct(filter)
                })
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
                    <div className="chart-item" style={{ backgroundColor: 'darkgoldenrod' }}>
                        <div className="d-flex">
                            <span><i class="fal fa-sack-dollar"></i></span>
                            <div>
                                <h6 className="text-white">Total</h6>
                                <h4 className="text-white">{new Intl.NumberFormat().format(total)} <span className="small">VND</span></h4>
                            </div>
                        </div>
                        {/* <Statistic title="Total" value={total} /> */}
                    </div>
                </Col>
                <Col span={6}>
                    <div className="chart-item" style={{ backgroundColor: 'darkorange' }}>
                        <div className="d-flex">
                            <span><i class="fal fa-bullseye-pointer"></i></span>
                            <div>
                                <h6 className="text-white">Target</h6>
                                <h4 className="text-white">{new Intl.NumberFormat().format(100000000)} <span className="small">VND</span></h4>
                            </div>
                        </div>
                        {/* <Statistic title="Target" value={100000000} suffix="VND" /> */}
                    </div>
                </Col>
                <Col span={6}>
                    <div className="chart-item" style={{ backgroundColor: 'cornflowerblue' }}>
                        <div className="d-flex">
                            <span><i class="fal fa-calendar-alt"></i></span>
                            <div>
                                <h6 className="text-white">Month</h6>
                                <h4 className="text-white">{currentMonth}</h4>
                            </div>
                        </div>
                        {/* <Statistic title="Month" value={currentMonth} /> */}
                    </div>
                </Col>
                <Col span={6}>
                    <div className="chart-item" style={{ backgroundColor: 'red' }}>
                        <div className="d-flex">
                            <span><i class="fal fa-badge-percent"></i></span>
                            <div>
                                <h6 className="text-white">Percent</h6>
                                <h4 className="text-white">{total / 1000000} %</h4>
                            </div>
                        </div>
                        {/* <Statistic title="Percent" value={total/1000000} suffix="%" valueStyle={{color:'red'}} /> */}
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
                            label: 'Bar chart income',
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
            <h3 style={{ margin: '20px 0' }}>Best sale Food</h3>
            <div className="row bg-white mb-5 p-2">
                <div className="col-4">
                    <Pie
                        labels={product.map(item => item.nameFood)}
                        data={{
                            datasets: [{
                                label: 'Bar chart ',
                                data: product.map(item => item.saled),
                                backgroundColor: [
                                    "#3e95cd",
                                    "#8e5ea2",
                                    "#3cba9f",
                                    "#e8c3b9",
                                    "#c45850"
                                ],
                                borderWidth: 1
                            }]
                        }}
                        option={{
                            title: {
                                display: true,
                                text: "Best saled food"
                            },
                        }}
                    />
                </div>
                <div className="col-1"></div>
                <div className="col-7">
                    <table class="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Saled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.length > 0 ? product.slice(0, 5).map((car, index) => {
                                return (
                                    <tr className="list-car-row">
                                        <th scope="row"> {index + 1} </th>
                                        <td> {car.nameFood}</td>
                                        <td> {new Intl.NumberFormat().format(car.price)} VND</td>
                                        <td> {car.saled}</td>
                                    </tr>
                                );
                            }) :
                                <Skeleton style={{ backgroundColor: "black" }} active />}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Chart