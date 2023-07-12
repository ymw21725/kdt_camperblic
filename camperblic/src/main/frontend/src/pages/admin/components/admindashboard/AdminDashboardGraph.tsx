import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Barchart from './Barchart';
import { GraphDTO } from '../../../../types';

interface GraphDataItem {
    date: string;
    value: number;
}

const AdminDashboardGraph = () => {
    const [graphData, setGraphData] = useState<GraphDataItem[]>([]);
    const [graphDTO, setGraphDTO] = useState<GraphDTO | null>(null);

    useEffect(() => {
        axios
            .get('/admindashboard/admindashboardchart')
            .then((response) => {
                const data: [string, number][] = response.data;

                // 데이터 형식 변환
                const formattedData: GraphDataItem[] = data.map(([date, value]) => ({
                    date,
                    value,
                }));

                setGraphData(formattedData);

                // 날짜별 매출액 계산
                const currentDate = new Date().toISOString().slice(0, 10);
                const filteredData: GraphDTO = {
                    fourTotalPrice: 0,
                    threeTotalPrice: 0,
                    twoTotalPrice: 0,
                    oneTotalPrice: 0,
                    currTotalPrice: 0,
                    totalPriceSum: 0,
                };

                formattedData.forEach(({ date, value }) => {
                    const daysAgo = Math.floor(
                        (new Date(currentDate).getTime() - new Date(date).getTime()) /
                        (24 * 60 * 60 * 1000)
                    );
                    if (daysAgo === 4) {
                        filteredData.fourTotalPrice += value;
                    } else if (daysAgo === 3) {
                        filteredData.threeTotalPrice += value;
                    } else if (daysAgo === 2) {
                        filteredData.twoTotalPrice += value;
                    } else if (daysAgo === 1) {
                        filteredData.oneTotalPrice += value;
                    } else if (daysAgo === 0) {
                        filteredData.currTotalPrice += value;
                    }
                });

                // 현재월 총합 계산
                filteredData.totalPriceSum = formattedData.reduce(
                    (sum, { value }) => sum + value,
                    0
                );

                setGraphDTO(filteredData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <section>
            {graphDTO ? (
                <Barchart graphDTO={graphDTO} />
            ) : (
                <p>Loading graph data...</p>
            )}
        </section>
    );
};

export default AdminDashboardGraph;
