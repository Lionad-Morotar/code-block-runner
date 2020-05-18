<template>
  <div
    class="html-pan"
    :class="{ 'active-pan': isActivePan }"
    @click="setActivePan('html')"
    :style="style">
    <div class="pan-head">
      <Dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ code.name }} 
        </span>
        <DropdownMenu slot="dropdown">
          <DropdownItem>HTML</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <textarea ref="editor" :value="code.code"></textarea>
    <PanResizer pan="html" :enable="enableResizer" />
  </div>
</template>

<script>
import createPan from '@/utils/create-pan'
export default createPan({
  name: 'html',
  editor: {
    mode: 'htmlmixed',
    autoCloseTags: true
  }
})
</script>
