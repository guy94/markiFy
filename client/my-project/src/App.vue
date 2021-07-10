<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" style="background-color:black">
      <b-navbar-brand style="margin-left: 60px;"><strong>MarkiFy</strong></b-navbar-brand>
    </b-navbar>
    <br/>
    <br/>
    <form class="form" @submit.prevent="scanFolder()">
      <label for="file" style="padding-right: 1%;">Insert Full Folder Path: </label>
      <input type="text" v-model="folderPath"/>
      <input class="button" type="submit" value="Scan">
    </form>
    <br/>
    <AudioPage :audios="audios" :totalItems="totalItems"></AudioPage>
  </div>
</template>

<script>
import AudioPage from './pages/AudioPage.vue'

export default {
  name: 'App',
  components: {
    AudioPage
  },
  data(){
    return {
      audios: [],
      folderPath: "", 
      totalItems: 0
    }
  },
  methods:{
    async getAudios(){
      let response = await this.axios.get(
          `http://localhost:3000/audio/getAudios`,
        );
        this.audios = response.data
        this.totalItems = this.audios.length;
    },
    async scanFolder(){
      await this.axios.post(
          `http://localhost:3000/audio/addAudios`,
          {
            folderPath: this.folderPath
          }
        );

        await this.getAudios()
        window.location.reload()
    }
  },
  mounted(){
    this.getAudios();
  },
}
</script>

<style >
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
  background-color: #cddfd9;
}
#app {
  background-color: #cddfd9;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.button{
  background-color: #263a37;
  border: none;
  color: white;
  margin-left: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
}
.form{
  padding-right: 56%;
  font-weight: 600; 
  font-size:large;
}
</style>
