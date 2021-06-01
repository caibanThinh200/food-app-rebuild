import {Bar, Line} from 'react-chartjs-2'
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/Context"
import axios from 'axios';
const Chart = () =>{
    const { API_URL } = useContext(context);
    const [cateName, setCateName] = useState([])
    useEffect(() => {
     try {
         axios.get(API_URL + "/cate")
            .then(res=>{
                console.log(res.data)
                const arr = []
                res.data.map(item=>{
                    arr.push(item.nameCategory)
                })
                setCateName(arr)
            })
     } catch (error) {
         console.log(error)
     }
  }, []);
    
    return(
        <div className="container chart-component">
            {/* <div className="row" style={{marginBottom:'30px'}}>
            <div className="col-3">
                    <div className="chart-item bg-warning"></div>
                </div>
                <div className="col-3">
                    <div className="chart-item"></div>
                </div>
                <div className="col-3">
                    <div className="chart-item"></div>
                </div>
                <div className="col-3">
                    <div className="chart-item"></div>
                </div>
            </div> */}
            <div className="row bg-white">
                <Bar
                style={{padding:'20px'}}
                    data={{
                        labels: cateName,
                        datasets: [{
                            label: 'Quantity',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'orange'
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