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
                            <a class="nav-link active navbar-hove" @click="goto('/')">主控制台</a>
                            <a class="nav-link navbar-hove" @click="goto('/member')">成員資料</a>
                            <a class="nav-link navbar-hove" @click="goto('/diagram')">圖表預覽</a>
                        </nav>
                    </div>
                </div>
            </div> 
            <div class="col-10">
                <p class="text-center h2 main-panel">數據主控台</p>
                <div class="container content-margin">
                    <div class="row">
                        <div class="col-sm">
                            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                                <div class="card-header text-center"><h2>成員</h2></div>
                                <div class="card-body">
                                    <h5 class="card-title text-center"><h2>{{ info.count }}</h2></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
                                <div class="card-header text-center"><h2>男性</h2></div>
                                <div class="card-body">
                                    <h5 class="card-title text-center"><h2>{{ info.male }}</h2></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
                                <div class="card-header text-center"><h2>女性</h2></div>
                                <div class="card-body">
                                    <h5 class="card-title text-center"><h2>{{ info.female }}</h2></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <highcharts :options="chartOptions"></highcharts>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            info: {
                male: '',
                female: '',
                count: ''
            },
            msg: 'Dashboard',
            chartOptions: {
                title: {
                    text: '成員性別比例'
                },
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    data: [{
                        name: '男性',
                        y: 1,
                        sliced: true,
                        selected: true
                    }, {
                        name: '女性',
                        y: 2
                    }]
                }]
            }
        }
    },
    methods:{
        goto: function (link) {
            this.$router.push(link)
        }
    },
    mounted: function () {
        this.axios.get('//localhost:8000/get/dashboard').then((response) => {
            let res = response.data
            this.info.male = res.male
            this.info.female = res.female
            this.info.count = res.count
            this.chartOptions.series[0].data[0].y = res.male
            this.chartOptions.series[0].data[1].y = res.female
        })
    }
}
</script>
