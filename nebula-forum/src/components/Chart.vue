<template>
<div class="container">
  <canvas id="myChart" width='650' height='400'></canvas>
</div>
</template>


<script>
import Chart from 'chart.js';

const colors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

const bColor= [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

export default {
  props: ['options'],
  mounted() {
    const choices = JSON.parse(JSON.stringify(this.options));
    const labels = choices.map((choice) => choice.answer);
    const backgroundColor = colors.slice(0, choices.length);
    const data = choices.map((choice) => choice.voteCount);
    const borderColor = bColor.slice(0, choices.length);
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: '# of Votes',
                data,
                backgroundColor,
                borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            legend: {
              display: true,
              position: 'top',
            }
        }
    });
  }
}
</script>

<style>

.container {
  height: 300px;
  width: 90%;
  margin: auto;
}
</style>