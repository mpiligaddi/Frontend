import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

type CategoryChartProps = {
  labels: string[];
  values: number[];
  title: string;
};

const CategoryChart: FC<CategoryChartProps> = ({ labels, values, title }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '%',
        data: values,
        backgroundColor: [
          '#333333',
          '#666666',
          '#cccccc',
          '#999999',
          '#dedede'
        ],
        //clip: {left: 5, top: false, right: -2, bottom: 0},
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
        title={title}
        options={{
          responsive: true,
          layout: {
            padding: 10
            //margin: 50,
          },

          title: {
            display: true,
            text: `${title}`
          },

          legend: {
            align: 'center',
            //boxWidth: 500,
            position: 'bottom',
            //textAlign: 'center',
            //boxWidth: 800,
            labels: {
              usePointStyle: true,
              textAlign: 'center',
              boxWidth: 200,
              padding: 5
            },

            animateRotate: true,
            animateScale: true
          },
          borderAlign: 'inner'
        }}
      />
    </>
  );
};

export default CategoryChart;
