<template>
  <div
    class="css-pan"
    :class="{ 'active-pan': isActivePan }"
    @click="setActivePan('css')"
    :style="style">
    <div class="pan-head">
      <Dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ code.name }} 
        </span>
        <DropdownMenu slot="dropdown">
          <DropdownItem>CSS</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <textarea ref="editor" :value="code.code"></textarea>
    <PanResizer pan="css" :enable="enableResizer" />
  </div>
</template>

<script>
import createPan from '@/utils/create-pan'

export default createPan({
  name: 'css',
  editor: {
    mode: 'css',
    autoCloseBrackets: true
  }
})
</script>
