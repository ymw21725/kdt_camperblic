import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import {GraphDTO} from "../../../../types";

interface Props {
    graphDTO: GraphDTO;
}

const Barchart: React.FC<Props> = ({ graphDTO }) => {

    const handle = {
        barClick: (data: any) => {
            console.log(data);
        },
        legendClick: (data: any) => {
            console.log(data);
        },
    };
    const currentDate = new Date(); // Get the current date
    console.log(currentDate);
    const previousDates = []; // Array to store previous dates

    // 이전 날짜 계산
    for (let i = 0; i < 5; i++) {
        const previousDate = new Date(); // 새로운 날짜 객체 생성
        previousDate.setDate(currentDate.getDate() - i ); // 현재 날짜에서 i일을 뺌
        const formattedDate = `${previousDate.getMonth() + 1}월${previousDate.getDate()}일`; // 월과 일을 한글로 포맷팅
        previousDates.push(formattedDate); // 이전 날짜를 배열에 추가
    }

    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    const chartData: {
        bottle: string;
        '총합'?: number;
        '4일전'?: number;
        '3일전'?: number;
        '2일전'?: number;
        '1일전'?: number;
        '오늘'?: number;
    }[] = [
        { bottle: `${currentMonth} 총합`, '총합': graphDTO.totalPriceSum },
        { bottle: `${previousDates[4]}`, '4일전': graphDTO.fourTotalPrice },
        { bottle: `${previousDates[3]}`, '3일전': graphDTO.threeTotalPrice },
        { bottle: `${previousDates[2]}`, '2일전': graphDTO.twoTotalPrice },
        { bottle: `${previousDates[1]}`, '1일전': graphDTO.oneTotalPrice },
        { bottle: `${previousDates[0]}`, '오늘': graphDTO.currTotalPrice },
    ];

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <section style={{ width: '800px', height: '500px', margin: '0 auto' }}>
            {/*{graphDTO.map((item) => (*/}
            <ResponsiveBar
                /**
                 * chart에 사용될 데이터
                 */
                data ={chartData}
                /**
                 * chart에 보여질 데이터 key (측정되는 값)
                 */
                keys={['총합', '4일전', '3일전','2일전', '1일전', '오늘']}
                /**
                 * keys들을 그룹화하는 index key (분류하는 값)
                 */
                indexBy="bottle"
                /**
                 * chart margin
                 */
                margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
                /**
                 * chart padding (bar간 간격)
                 */
                padding={0.3}
                /**
                 * chart 색상
                 */
                colors={['olive', 'brown', 'orange','aqua','cadetblue','wheat']} // 커스터하여 사용할 때
                // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                /**
                 * color 적용 방식
                 */
                colorBy="id" // 색상을 keys 요소들에 각각 적용
                // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
                theme={{                    /**
                     * label style (bar에 표현되는 글씨)
                     */
                    labels: {
                        text: {
                            fontSize: 14,
                            fill: '#000000',
                        },
                    },
                    /**
                     * legend style (default로 우측 하단에 있는 색상별 key 표시)
                     */
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: '#000000',
                        },
                    },
                    axis: {
                        /**
                         * axis legend style (bottom, left에 있는 글씨)
                         */
                        legend: {
                            text: {
                                fontSize: 20,
                                fill: '#000000',
                            },
                        },
                        /**
                         * axis ticks style (bottom, left에 있는 값)
                         */
                        ticks: {
                            text: {
                                fontSize: 16,
                                fill: '#000000',
                            },
                        },
                    },
                }}
                /**
                 * axis bottom 설정
                 */
                axisBottom={{
                    tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5, // tick padding
                    tickRotation: 0, // tick 기울기
                    // legend: '종류', // bottom 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: 40, // 글씨와 chart간 간격
                }}
                /**
                 * axis left 설정
                 */
                axisLeft={{
                    tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5, // tick padding
                    tickRotation: 0, // tick 기울기
                    legend: '매출액(원)', // left 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: -90, // 글씨와 chart간 간격
                }}
                /**
                 * label 안보이게 할 기준 width
                 */
                labelSkipWidth={36}
                /**
                 * label 안보이게 할 기준 height
                 */
                labelSkipHeight={12}
                /**
                 * bar 클릭 이벤트
                 */
                onClick={handle.barClick}
                /**
                 * legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
                 */
                legends={[
                    {
                        dataFrom: 'keys', // 보일 데이터 형태
                        anchor: 'bottom-right', // 위치
                        direction: 'column', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 120, // chart와 X 간격
                        translateY: 0, // chart와 Y 간격
                        itemsSpacing: 2, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 20, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 0.85, // item opacity
                        symbolSize: 20, // symbol (색상 표기) 크기
                        effects: [
                            {
                                // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                        onClick: handle.legendClick, // legend 클릭 이벤트
                    },
                ]}
            />
            {/*))}*/}
        </section>
    );
};

export default Barchart;