<template>
  <!--  leave-active-class="animate__animated animate__fadeOutDown"-->
  <transition enter-active-class="animate__animated  animate__fadeInUp"
  >
    <div class="keyBoardOutBox" v-show="showKeyboardInside">
      <div class="keyBoardLine" v-for="(line,index) in keys" :key="'keyBoardLine'+index">
            <span class="keyBoardItem" v-if="index === 3"
                  @click="showKeyboardInsideHide"
                  style="display: flex;align-items: center;justify-content: center;margin-left: 0;margin-right: auto">
                <img :src="require('../../assets/images/键盘.png')" alt="">
            </span>
        <span @click="inputTxtLength<5&&clickItem(key)" class="keyBoardItem" v-for="(key,indexs) in line"
              :key="'keyBoardItem'+indexs">
                {{ key }}
            </span>
        <span @click="delItem"
          class="keyBoardItem" v-if="index === 3"
              style="display: flex;align-items: center;justify-content: center;margin-left: auto;margin-right: 0">
                <img :src="require('../../assets/images/键盘删除.png')" alt="">
            </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "userKeyBoard",
  props: ['inputTxtLength'],
  data: function () {
    return {
      keys: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [0]
        // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        // ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        // ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        // ["Z", "X", "C", "V", "B", "N", "M"],
      ],
      isFocus: false, // 是否聚焦
      showKeyboardInside: false
    }
  },
  methods: {
    showKeyboardInsideShow() {
      this.showKeyboardInside = true
    },
    showKeyboardInsideHide() {
      this.showKeyboardInside = false
    },
    clickItem(item) {
      this.$emit('clickboard', item)
    },
    delItem(){
      this.$emit('delkeyboarditem')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.keyBoardOutBox {
  background: rgb(247, 247, 247);
  padding: 10px 0;
  height: fit-content;
  align-self: flex-end;
  width: 100%;

}

.keyBoardLine {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 10px 0;
  justify-content: center;
}

.keyBoardItem {
  /*数字键盘*/
  height: 0.5rem;
  /*数字键盘*/
  border-radius: 5px;
  font-weight: bold;
  padding: 5px 10px;
  margin-right: 5px;
  background: rgb(254, 254, 254);
}

.keyBoardItem img {
  height: 0.5rem;
  /*height: 1.5rem;*/
}
</style>
