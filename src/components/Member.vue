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
                            <a class="nav-link active navbar-hove" href="#">成員資料</a>
                            <a class="nav-link navbar-hover" href="#">圖表預覽</a>
                            <a class="nav-link navbar-hove" href="#">題目篩選</a>
                        </nav>
                    </div>
                </div>
            </div> 
            <div class="col-10">
                <p class="text-center h2 main-panel">搜尋成員</p>
                <div class="container content-margin">
                    <div class="row">
                        <div class="col-sm">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">@</span>
                                </div>
                                <input type="text" class="form-control" v-model="keyword" placeholder="學號或姓名" v-on:keyup.enter="getStudent" aria-describedby="basic-addon1">
                                <button type="button" class="btn btn-dark" @click="getStudent">搜尋</button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <table class="table" v-if="student != ''">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">學號</th>
                                        <th scope="col">姓名</th>
                                        <th scope="col">性別</th>
                                        <th scope="col">系所</th>
                                        <th scope="col">答題狀況</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, i) in gender" :key="i">
                                        <td>{{ item.username }}</td>
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.gender }}</td>
                                        <td>{{ item.department }}</td>
                                        <td><button type="button" class="btn btn-outline-success" @click="preview(item.id)">預覽</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
            keyword: '',
            student: [],
            msg: 'Dashboard',
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
                    text: '成員性別比例圖'
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
                        y: 61.41,
                        sliced: true,
                        selected: true
                    }, {
                        name: '女性',
                        y: 11.84
                    }]
                }]
            }
        }
    },
    methods: {
        goto: function () {
            this.$router.push('/login')
        },
        getStudent: function () {
            if (this.keyword == '') {
                return false
            }
            this.axios.get('//localhost:8000/get/student/' + this.keyword).then((response) => {
                this.student = response.data
            })
        },
        preview: function (id) {
            this.$router.push('/preview/student/' + id)
        }
    },
    created() { 
        
    },
    computed: {
        gender () {
            this.student.forEach(function(e) {
                if (e.gender == 1) {
                    e.gender = "男";
                } else if (e.gender == 0) {
                    e.gender = "女";
                }
            })
            return this.student
        }
    }
}
</script>