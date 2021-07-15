import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

type ResponsibleChartProps = {
  labels: string[];
  values: number[];
  title: string;
};

const ResponsibleChart: FC<ResponsibleChartProps> = ({
  labels,
  values,
  title
}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '%',
        data: values,
        backgroundColor: [
          '#243954',
          '#365670',
          '#4B758C',
          '#6297A8',
          '#7CBAC4',
          '#6FB1B4',
          '#9ADEE0'
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
            // margin: 20,
          },
          title: {
            display: true,
            text: `${title}`
          },

          legend: {
            position: 'bottom',
            align: 'center',
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

export default ResponsibleChart;
