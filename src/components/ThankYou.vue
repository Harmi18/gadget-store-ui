<template>
  <div>
    <h2>Thank You For Shopping</h2>
    <br />
    <span
      ><button
        type="button"
        class="btn btn-primary btn-lg"
        @click="this.$router.push({ path: '/home' })"
      >
        Continue Shopping
      </button></span
    >
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>