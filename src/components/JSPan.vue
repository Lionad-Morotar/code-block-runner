<template>
  <div
    class="js-pan"
    :class="{ 'active-pan': isActivePan }"
    @click="setActivePan('js')"
    :style="style">
    <div class="pan-head">
      <Dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ code.name }} 
        </span>
        <DropdownMenu slot="dropdown">
          <DropdownItem>JavaScript</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <textarea ref="editor" :value="code.code"></textarea>
    <PanResizer pan="js" :enable="enableResizer" />
  </div>
</template>

<script>
import createPan from '@/utils/create-pan'

export default createPan({
  name: 'js',
  editor: {
    mode: 'jsx',
    autofocus: true,
    autoCloseBrackets: true
  }
})
</script>
