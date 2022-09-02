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

    <vue-final-modal v-model="showModal">
      <div class="modal__header">
        <button class="modal__close" @click="showModal = false">
          x
        </button>
      </div>
      <div class="modal__content">
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
    </vue-final-modal>
    <button @click="showModal = true">Open Modal</button>
  </div>
</template>
<script>
import DevSelect from "./DevSelect";
import DevSelectMultiple from "./DevSelectMultiple";
import DevSelectMultipleTaggable from "./DevSelectMultipleTaggable";

export default {
  components: {
    DevSelectMultipleTaggable,
    DevSelectMultiple,
    DevSelect
  },
  data: () => ({
    showModal: false
  })
}

</script>
<style lang="css">
body, html {
  height: 100vh;
}

.dev-selects {
  padding: 20px;
  display: grid;
  grid-gap: 12px;
}
.vfm__content {
  background-color: #FFFFFF;
  height: 100vh;
  padding: 10px;
}

.modal__header {
  display: flex;
  justify-content: flex-end;
}


</style>
