<!--
 * @Author: your name
 * @Date: 2021-01-11 10:14:14
 * @LastEditTime: 2021-06-05 16:05:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\WebpackDome\webpack-vue\src\App.vue
-->
<template>
  <div>
    <datePicker></datePicker>
    <!-- <h1 class="example">{{ msg }}</h1>
    <img src="./assets/616945.png" alt srcset /> -->
  </div>
</template>

<script>
import Axios from "./api";
export default {
  name: "app",
  data() {
    return {
      msg: "Hello world!",
    };
  },
  mounted() {
    Axios.get("/api");
  },
};
</script>

<style lang='less'>
.example {
  color: red;
}
</style>