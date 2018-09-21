<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Admin</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="#">資料管理</a>
                </div>
            </div>
        </nav>
        <div class="row">
            <div class="col-2 fhp">
                <div class="row">
                    <div class="col align-self-center">
                        <nav class="nav flex-column content-margin left-menu">
                            <a class="nav-link active" href="#">成員資料</a>
                            <a class="nav-link" href="#">圖表預覽</a>
                            <a class="nav-link" href="#">題目篩選</a>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="col-10">
                <div class="container content-margin">
                    <div class="row">
                        <div class="col-sm">
                            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                                <div class="card-header text-center"><h2>成員</h2></div>
                                <div class="card-body">
                                    <h5 class="card-title text-center"><h2>501</h2></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
                                <div class="card-header text-center"><h2>男性</h2></div>
                                <div class="card-body">
                                    <h5 class="card-title text-center"><h2>257</h2></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
                                <div class="card-header text-center"><h2>女姓</h2></div>
                                <div class="card-body">
                                    <h5 class="card-title text-center"><h2>244</h2></h5>
                                </div>
                            </div>
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
            msg: 'Dashboard'
        }
    },
    methods:{
        goto: function () {
            this.$router.push('/login')
        }
    }
}
</script>
<style>
    body {
        font-family: '微軟正黑體';
        margin: 0;
        overflow: hidden;
    }
    .content-margin {
        margin-top: 40px;
    }
    .left-menu a {
        margin-left: 100px;
        color: #FFF;
        font-size: 18px;
    }
    .fhp {
        box-sizing: border-box;
        height: 100vh;
        background-color: #2d4160;
    }
</style>

