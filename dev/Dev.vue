<template>
  <div class="dev-selects">
    <div>
      <label>
        Taggable
      </label>
      <DevSelectTaggable/>
    </div>
    <div>
      <label>
        Simple
      </label>
      <DevSelect/>
    </div>
  </div>
</template>

<style lang="css">
body, html {
  height: 100vh;
}

.dev-selects {
  padding: 20px;
  display: grid;
  grid-gap: 12px;
}
</style>
<script>
import DevSelectTaggable from "./DevSelectTaggable";
import DevSelect from "./DevSelect";
export default {
  components: { DevSelect, DevSelectTaggable }
}
</script>
