<template>
  <div class="dev-selects">
    <div>
      <label>
        Taggable Multiple
      </label>
      <DevSelectMultipleTaggable/>
    </div>
    <div>
      <label>
        Simple Multiple
      </label>
      <DevSelectMultiple/>
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
import DevSelectMultipleTaggable from "./DevSelectMultipleTaggable";
import DevSelectMultiple from "./DevSelectMultiple";
import DevSelect from "./DevSelect";
export default {
  components: { DevSelect, DevSelectMultiple, DevSelectMultipleTaggable }
}
</script>
