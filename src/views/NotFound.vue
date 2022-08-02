<template>
  <div class="container-404">
    <div class="top">
      <img class="logo" src="../assets/icon/NotFound-logo.svg" alt="" />
      <h4>404 Not Found</h4>
    </div>
    <button class="back" @click="$router.go(-1)">back</button>
  </div>
</template>

<style scoped>
.container-404 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.top {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 80px;
  height: 80px;
}

h4 {
  font-size: 45px;
  color: var(--dark-70);
}

.back {
  font-size: 28px;
  color: var(--primary);
  text-decoration: underline;
}
</style>
