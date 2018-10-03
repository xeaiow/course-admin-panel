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
                <div class="col-sm" style="max-height:600px;overflow-y:scroll;">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" width="3%">#</th>
                                <th scope="col">題目</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="focus-pointer" v-for="(item, i) in removeFinish" :key="i"  @click="goto('/diagram/' + item.id)">
                                <td>{{ i+1 }}</td>
                                <td>{{ item.question }}</td>
                            </tr>
                        </tbody>
                    </table>
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
            questionResult: []
        }
    },
    methods: {
        goto: function (link) {
            this.$router.push(link)
        }
    },
    mounted: function () {
    },
    computed: {
        removeFinish () {
            let self = this
            this.question.forEach(function(e, i) {
                if (e.finish == undefined) {
                    self.questionResult.push(e)
                }
            })
            return this.questionResult
        }
    }
}
</script>