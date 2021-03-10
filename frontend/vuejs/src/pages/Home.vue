<template>
    <div class="container">
        <div class="card card-default">
            <!-- <div class="card-header">Admin Dashboard:  {{ user.email }}</div> -->
            <div class="card-body">
                Bienvenue sur votre dashboard administrateur
            </div>
        </div>
    </div>
</template>

<script>
  // import token from '@/utils/token'

  export default {
    name: 'home',
    data () {
      return {
        user: {}
      }
    },
    async created () {
      // const parameter = token.getToken();
      // await this.$store.dispatch("auth/getAuth", parameter)
      //   .then(response => {
      //     console.log(response);
      //     this.user = response.data;
      //   }).catch(error => {
      //       alert(error);
      //   })
    }
  }
</script>
