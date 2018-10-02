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
                            <a class="nav-link navbar-hove" href="#">圖表預覽</a>
                        </nav>
                    </div>
                </div>
            </div> 
            <div class="col-10">
                <div class="container content-margin">
                    <div class="row">
                        <div class="col-sm">
                            <table class="table table-hover" v-if="student != ''">
                                <thead>
                                    <tr>
                                        <th scope="col" width="15%">學號</th>
                                        <th scope="col" width="15%">姓名</th>
                                        <th scope="col" width="10%">性別</th>
                                        <th scope="col" width="20%">系所</th>
                                        <th scope="col">結果</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ student.username }}</td>
                                        <td>{{ student.name }}</td>
                                        <td>{{ ( student.gender == 1 ? "男":"女" ) }}</td>
                                        <td>{{ student.department }}</td>
                                        <td>{{ convertAnswer }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="h2 text-center">答題過程</div>
                    <div class="row">
                        <div class="col-sm" style="max-height:650px;overflow-y:scroll;">
                            <timeline>
                                <div v-for="(item, i) in convertText" :key="i" style="margin-bottom:30px;">
                                    <timeline-title font-color="#999">{{ item.question }}</timeline-title>
                                    <timeline-item bg-color="#FF2E63">{{ item.answer }}</timeline-item>
                                </div>                            
                            </timeline>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import questions from '@/assets/json/questions'

export default {
    data () {
        return {
            question: questions,
            student: [],
            answer: [],
            count: ''
        }
    },
    methods:{
        goto: function (link) {
            this.$router.push(link)
        }
    },
    mounted: function () {
        this.axios.get('//localhost:8000/get/preview/student/' + this.$route.params.id).then((response) => {
            this.student = response.data.student
            this.answer = response.data.answer
        })
    },
    components: {
        Timeline,
        TimelineItem,
        TimelineTitle
    },
    computed: {
        convertAnswer () {

            let finalId = this.answer[this.answer.length-1]
            let self = this

            this.question.forEach(function(e) {
                if (e.opt == "any") {
                    if (e.parent == finalId.question_id) {
                        self.count = e.question    
                    }
                }
                else {
                    if (e.parent == finalId.question_id && e.opt == finalId.answer) {
                        self.count = e.question    
                    }
                }
                
            })
            return this.count
        },
        convertText () {
            
            let q = this.question
            let self = this

            this.answer.forEach(function(e) {
                let question = q[e.question_id-1]
                e.question = question.question
                e.answer = question.answer[e.answer]                
            })
            // 最後分數與結果
            // for (var i = 0; i < this.question.length; i++){
            //     if (this.question[i].parent == 18) {
            //         self.count = this.question[i].question
            //     }
            // }
            return this.answer
            // for (var i = 0; i < ; i++){              
            //         self.count = this.question[i].question
            // }
        }
    }
}
</script>
