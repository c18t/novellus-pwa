<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align left
  color #2c3e50
  background-color #FAF4F0
  padding: 30px

#nav
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
