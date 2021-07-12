import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

const ChainsChart: FC = ({ labels, dataChainsChart, title }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '%',
        data: dataChainsChart,
        backgroundColor: [
          '#FFE5B6',
          '#FFD27A',
          '#af8a40',
          '#FFB728',
          '#FFAA00',
          '#FF8B00',
          '#FF6C00',
          '#ff623b',
          '#e65100',
          '#FF4E00',
          '#FF4900',
          '#FFE5B6',
          '#FFD27A',
          '#FFC551',
          '#FFB728',
          '#FFAA00',
          '#FF8B00',
          '#FF6C00',
          '#ff623b',
          '#e65100',
          '#FF4E00',
          '#FF4900',
          '#FFE5B6',
          '#FFD27A',
          '#FFC551',
          '#FFB728',
          '#FFAA00',
          '#FF8B00',
          '#FF6C00',
          '#ff623b',
          '#e65100',
          '#FF4E00',
          '#FF4900'
        ],
        hoverBorderColor: ['#efefef']
      }
    ]
  };

  return (
    <>
      <Doughnut
        type=""
        data={data}
        width={50}
        height={75}
        options={{
          responsive: true,
          layout: {
            padding: 10
            //margin: 20,
          },
          title: {
            display: true,
            text: title
          },

          legend: {
            position: 'bottom',
            align: 'center',
            boxWidth: 200,
            labels: {
              usePointStyle: true,
              textAlign: 'center',
              boxWidth: 200,
              padding: 5
            },
            animateScale: true
          },
          borderAlign: 'inner'
        }}
      />
    </>
  );
};

export default ChainsChart;
