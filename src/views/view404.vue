<template>
  <main :class="$route.name + '-main'" :ref="$route.name + '_main_ref'">
    <div class="err-img">
      <img src="../assets/images/404.png" alt="网页404错误" />
    </div>
    <div class="hint">唉，真不巧，网页走丢了</div>
    <div class="back-v">
      <router-link to="/index">返回首页</router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: "view404"
};
</script>
