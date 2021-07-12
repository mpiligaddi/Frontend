import { Doughnut } from 'react-chartjs-2';

const ResponsibleChart = ({ labels, dataResp, title }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '%',
        data: dataResp,
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
            animateScale: true,
            animateScale: true
          },
          borderAlign: 'inner'
        }}
      />
    </>
  );
};

export default ResponsibleChart;
