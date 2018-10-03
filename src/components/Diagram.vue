<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Course Admin Panel</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>

        <div class="row">
            <div class="col-2 fhp">
                <div class="row">
                    <div class="col align-self-center">
                        <nav class="nav flex-column content-margin left-menu">
                            <a class="nav-link navbar-hove" @click="goto('/')">主控制台</a>
                            <a class="nav-link active navbar-hove" @click="goto('/member')">成員資料</a>
                            <a class="nav-link navbar-hove" @click="goto('/diagram')">圖表預覽</a>
                        </nav>
                    </div>
                </div>
            </div> 
            <div class="col-10">
                
                <highcharts :options="chartOptions"></highcharts>
                <div class="container content-margin">
                    <div class="row">
                        <div class="col-sm" v-for="(item, i) in questionAnswer" :key="i">
                            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                                <div class="card-header text-center"><h2>{{ questionAnswer[i] }}</h2></div>
                                <div class="card-body">
                                    <h5 class="card-title text-center"><h2>{{ chartOptions.series[0].data[i].y }}</h2></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
                                <div class="card-header text-center"><h2>總筆數</h2></div>
                                <div class="card-body">
                                    <h5 class="card-title text-center"><h2>{{ questDist.length }}</h2></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <download-excel
                    class="text-center"
                    :data="chartOptions.series[0].data"
                    :name="chartOptions.title.text + today">
                    <button type="button" class="btn btn-dark">匯出 Excel</button>
                </download-excel>

            </div>

        </div>
    </div>
</template>

<script>
import questions from '@/assets/json/questions'
export default {
    data () {
        return {
            question: questions,
            msg: 'Dashboard',
            today: new Date().getFullYear() + '' + (new Date().getMonth()+1) + ''+new Date().getDate(),
            questDist: [],
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            questionAnswer:[],
            chartOptions: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                title: {
                    text: '比例圖'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                        }
                    }
                },
                series: [{
                    name: '比例',
                    colorByPoint: true,
                    data: []
                }]
            }
        }
    },
    methods: {
        goto: function (link) {
            this.$router.push(link)
        }
    },
    mounted: function () {
        this.axios.get('//localhost:8000/get/quest/dist/' + this.$route.params.id).then((res) => {
            this.questDist = res.data

            let self = this
            this.questDist.forEach(function(e) {
                switch (e.answer) {
                    case 0:
                        self.a++
                        break;
                    case 1:
                        self.b++
                        break;
                    case 2:
                        self.c++
                        break;
                    case 3:
                        self.d++
                        break;
                    case 4:
                        self.e++
                        break;
                    default:
                        break;
                }
            })
            this.question.forEach(function (e) {
                if (e.id == self.$route.params.id) {

                    // 題目標題
                    self.chartOptions.title.text = e.question

                    // 存入該題目答案
                    for (let i = 0; i < e.answer.length; i++) {
                        self.questionAnswer.push(e.answer[i])
                    }

                    // 注入 highcharts 基本架構
                    for (let i = 0; i < self.questionAnswer.length; i++) {
                        self.chartOptions.series[0].data.push({
                            'name': self.questionAnswer[i],
                            'y': 0
                        })
                    }

                    // 注入 highcharts 資料
                    for (let i = 0; i < self.questDist.length; i++) {
                        
                        self.chartOptions.series[0].data[ self.questDist[i].answer ].y++
                    }
                }
            })
        })
    }
}
</script>