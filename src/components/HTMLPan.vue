<template>
  <div
    class="html-pan"
    :class="{ 'active-pan': isActivePan }"
    @click="setActivePan('html')"
    :style="style"
  >
    <div class="pan-head">{{ code.name }}</div>
    <textarea ref="editor" :value="code.code"></textarea>
  </div>
</template>

<script>
import createPan from "./utils/create-pan";
export default createPan({
  name: "html",
  editor: {
    mode: "htmlmixed",
    autoCloseTags: true
  }
});
</script>
