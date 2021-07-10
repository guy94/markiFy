<template>
  <div> 
    <div class="table">
      <b-table id="audio-table" hover :items="this.audios" :fields="this.fields" bordered head-variant="dark" :current-page="currentPage" :per-page="perPage">
        <template #cell(IsFileValid)="row">
          <input  class="checkbox" type="checkbox" :checked="row.item.IsValid" @change="markValid(row.item)">
        </template>
      </b-table>
      <b-pagination pills class="pagin" size="md" aria-controls="#audio-table" v-model="currentPage" :total-rows="totalItems" :per-page="perPage"></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    audios: {
      type: Array, 
      required: true
    }, 
    totalItems: {
      type: Number, 
      required: true
    }
  },
  data() {
    return{
      fields: ['FileName', 'LengthInMin', 'SizeInMb', 'IsFileValid'],
      perPage: 10,
      currentPage: 1,
    }  
  },
  methods: {
    async markValid(item){
        await this.axios.put(
          `http://localhost:3000/audio/markAudios`,
          {
            objectId: item._id
          }
        );
        item.IsValid = !item.IsValid 
    },
  },
}
</script>

<style>
.table{
  font-size: large;
  font-weight: bold;
  padding-left: 2%;
  padding-right: 2%;
  padding-bottom: 2%;
  width: 800px;
  border-radius: 2px;
}
tr, td {
  padding: 50px;
  background-color: #1670e649;
}
.checkbox{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #eee;
  height: 20px;
  width: 20px;
}

</style>