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
                <p class="text-center h2 main-panel">搜尋成員 {{ department }}</p>
                <div class="container content-margin">
                    <div class="row">
                        <div class="form-group col-md-4">
                            <select v-model="department" class="form-control">
                                <option value="all" selected>篩選系所</option>
                                <option value="師培中心">師培中心</option>
                                <option value="應數系">應數系</option>
                                <option value="物理系">物理系</option>
                                <option value="化學系">化學系</option>
                                <option value="心理系">心理系</option>
                                <option value="生科系">生科系</option>
                                <option value="奈米學位學程">奈米學位學程</option>
                                <option value="理學學士學位學程">理學學士學位學程</option>
                                <option value="化工系">化工系</option>
                                <option value="土木系">土木系</option>
                                <option value="工業國際碩">工業國際碩</option>
                                <option value="工業系">工業系</option>
                                <option value="醫工系">醫工系</option>
                                <option value="電子系">電子系</option>
                                <option value="資訊國際碩">資訊國際碩</option>
                                <option value="資訊系">資訊系</option>
                                <option value="電機國際碩">電機國際碩</option>
                                <option value="電機系">電機系</option>
                                <option value="環工系">環工系</option>
                                <option value="機械系">機械系</option>
                                <option value="巨量碩士學程">巨量碩士學程</option>
                                <option value="國際商學學士學程">國際商學學士學程</option>
                                <option value="商學學士學程">商學學士學程</option>
                                <option value="企管碩專班">企管碩專班</option>
                                <option value="企管系">企管系</option>
                                <option value="國貿系">國貿系</option>
                                <option value="會計系">會計系</option>
                                <option value="資管碩專班">資管碩專班</option>
                                <option value="資管系">資管系</option>
                                <option value="財法系">財法系</option>
                                <option value="商學博">商學博</option>
                                <option value="財金系">財金系</option>
                                <option value="國際商碩">國際商碩</option>
                                <option value="建築系">建築系</option>
                                <option value="室設系">室設系</option>
                                <option value="商設系">商設系</option>
                                <option value="景觀系">景觀系</option>
                                <option value="設計博">設計博</option>
                                <option value="設計學士原住民專班">設計學士原住民專班</option>
                                <option value="文創設計碩">文創設計碩</option>
                                <option value="社會設計學士學程">社會設計學士學程</option>
                                <option value="特教系">特教系</option>
                                <option value="應外系">應外系</option>
                                <option value="宗研所">宗研所</option>
                                <option value="教研所">教研所</option>
                                <option value="應華系">應華系</option>
                                <option value="人育學士學程">人育學士學程</option>
                                <option value="電資學院學士班">電資學院學士班</option>
                                <option value="通訊碩士學位學程">通訊碩士學位學程</option>
                                <option value="生醫材料國際碩">生醫材料國際碩</option>
                                <option value="永續能源國際碩士學程">永續能源國際碩士學程</option>
                                <option value="人工智慧學士學程">人工智慧學士學程</option>
                            </select>
                        </div>
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
                        <div class="col-sm" style="max-height:600px;overflow-y:scroll;">
                            <table class="table table-hover" v-if="student != ''">
                                <thead>
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
                            <div class="alert alert-warning" role="alert" v-if="searchWarning">
                                糟糕了，找不到任何的資料，請換個關鍵字試試看！
                            </div>
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
            searchWarning: false,
            student: [],
            department: 'all',
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
        goto: function (link) {
            this.$router.push(link)
        },
        getStudent: function () {
            if (this.keyword == '') {
                return false
            }
            this.student = []
            this.axios.get('//localhost:8000/get/student/' + this.department + '/' + this.keyword).then((response) => {
                if (response.data.length == 0) {
                    return this.searchWarning = true
                }
                this.searchWarning = false
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