
<template>
  <div class="box" id="data_box">
    <div class="box-title">
      <p class="title">在线训练</p>
    </div>
    <div class="box-reminder">
      <div class="reminder">
        <p class="title">操作指导</p>
        <p>1. 填写模型信息并上传数据集</p>
        <p>2. 在线数据分析，进行数据矫正。</p>
        <p>3. 在线训练模型。</p>
      </div>
    </div>
    <div class="content">
      <Column />
    </div>
    <div class="content tips">
      <Alert  show-icon>
          提示
          <template #desc>
              检测出您上传的数据集存在空串或者未能识别的符号串，为了确保数据的准确性和完整性，我们会自动处理这些数据并将其排除。您是否愿意继续操作？ <Icon type="help-circled" size="14"></Icon>
          </template>
      </Alert>
    </div>
    <div class="box-table">
      <el-button  @click="back()" style="width: 80px;">返回</el-button>
      <el-button type="primary" @click="submit()" style="width: 80px;">下一步</el-button>
    </div>
    <div>
          <el-dialog
              v-model="data.centerDialogVisible"
              title="正在训练"
              width="30%"
              align-center
            >
            <div>
              <Space wrap>
                <Circle :percent="percent" :stroke-color="color">
                  <Icon v-if="percent === 100" type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
                  <span v-else style="font-size:24px">{{ percent }}%</span>
                </Circle>
                <!-- <ButtonGroup size="large">
                  <Button icon="ios-add" @click="add"></Button>
                  <Button icon="ios-remove" @click="minus"></Button>
                </ButtonGroup> -->
              </Space>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel()">取消</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import Column from '../../components/data/Column.vue'

/**
* 仓库
*/
const store = useStore();
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({
  name:'',
  introduce:'',
  centerDialogVisible : false,
})

//进度条
const percent = ref(0);

const color = computed(() => {
  let color = '#2db7f5';
  if (percent.value === 100) {
    color = '#5cb85c';
  }
  return color;
});

const add = () => {
  if (percent.value >= 100) {
    return false;
  }
  percent.value += 10;
};

const minus = () => {
  if (percent.value <= 0) {
    return false;
  }
  percent.value -= 10;
};

const cancel = () =>{
  data.centerDialogVisible = false
  percent.value = 0;
}
//倒计时
// function countdown() {
//   let seconds = 10;
//   const timer = setInterval(() => {
//     console.log(seconds)
//     percent.value += 10;
//     if (seconds === 0) {
//       clearInterval(timer);
//       console.log("Countdown complete!");
//     } else {
//       console.log(`Remaining seconds: ${seconds}`);
//       seconds--;
//     }
//     if(percent.value === 100){
//       cancel()
//       ElMessage.success({ message: '创建成功!'});
//       router.push({ path: "/trained" });
//     }
//   }, 1000);
// }

function countdown() {
  let seconds = 100;
  const timer = setInterval(() => {
    console.log(seconds);
    percent.value += 1; // 每秒增加 3.125，共 32 秒增加 100
    if (seconds === 0) {
      clearInterval(timer);
      console.log("Countdown complete!");
    } else {
      console.log(`Remaining seconds: ${seconds}`);
      seconds--;
    }
    if (percent.value === 100) {
      cancel();
      ElMessage.success({ message: '创建成功!' });
      router.push({ path: "/trained" });
    }
  }, 312.5);
}


const submit =()=>{
  data.centerDialogVisible = true
  countdown();

}
const back =()=>{
  router.go(-1)
  // window.history.go(-1)
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  document.querySelector("#data_box").scrollIntoView(true);
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>

.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  // height: 190vh;
  // height:100%;
  padding-bottom: 70px;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
  .box-title{
    float: left;
    padding-top: 22px;
    padding-left: 50px;
  }
  .title{
    font-size:18px;
    font-weight:bold;
  }
  .box-reminder{
    float: center;
    padding:5% 18% 0 18%;

    // background-color:rgba(184, 182, 182, 0.08);
    .reminder{
      padding: 13px 20px 20px 50px; //上右下左
      background-color: rgba(10, 10, 10, 0.064);
    }
  }
  .box-reminder p{
    text-align: left;
    line-height: 2;
  }

  .box-table{
    margin-top: 50px;


  }

}

.content{
  margin:30px 160px 0 160px;
}
.tips{
  text-align:left;
}
/deep/.analysis-name {
    margin-right: 68%;

}
/deep/.analysis {
    width: 458px;
}
</style>
