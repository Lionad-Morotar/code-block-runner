<template>
  <header class="header">
    <div class="header-left header-block"></div>
    <div class="header-middle header-block pan-toggles">
      <span
        class="pan-toggle"
        :class="{ visible: isVisible('html') }"
        @click="togglePan('html')"
      >HTML</span>
      <span class="pan-toggle" :class="{ visible: isVisible('css') }" @click="togglePan('css')">CSS</span>
      <span class="pan-toggle" :class="{ visible: isVisible('js') }" @click="togglePan('js')">JS</span>
      <span
        class="pan-toggle"
        :class="{ visible: isVisible('console') }"
        @click="togglePan('console')"
      >Console</span>
      <span
        class="pan-toggle"
        :class="{ visible: isVisible('output') }"
        @click="togglePan('output')"
      >Output</span>
    </div>
    <div class="header-right header-block">
      <!-- <Button class="header-right-item" plain @click="runCode">Run</Button> -->
    </div>
  </header>
</template>

<script>
import Get from "./utils/get-parent-attrs";

export default {
  data() {
    return {
      url: window && window.location.href
    };
  },
  methods: {
    runCode() {
      Get(this).$store.$emit("run");
    },
    togglePan(panName) {
      Get(this).$store.$emit("togglePan", panName);
    },
    isVisible(panName) {
      return Get(this).$store.visiblePans.indexOf(panName) !== -1;
    }
  }
};
</script>

<style lang="stylus" scoped>
.header {
  box-sizing: border-box;
  height: 40px;
  border-bottom: 1px solid #eee;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
}

.header-block {
  flex: 1;
  width: 0;
}

.header-left {
  display: flex;
  justify-content: flex-start;

  .header-left-item {
    margin-right: 10px;
  }
}

.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .header-right-item {
    margin-left: 10px;
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #eee;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
  }
}

.pan-toggles {
  display: flex;
  justify-content: center;
  height: 100%;

  .pan-toggle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    height: 100%;
    min-width: 50px;
    border-left: 1px solid #eee;
    border-right: @border-left;
    cursor: pointer;
    user-select: none;

    &.disabled {
      cursor: not-allowed;
    }

    &:not(:first-child) {
      margin-left: -1px;
    }

    &:hover {
      box-shadow: inset 0 0 0 white;
      background-color: #f9f9f9;
    }

    &.visible {
      background-color: #f9f9f9;
      box-shadow: inset 0 -5px 5px white;
    }
  }
}
</style>
