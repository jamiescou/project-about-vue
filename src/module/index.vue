<template>
</template>

<script>
import dispatch from 'module/member/service/dispatch'
import cookieTools from 'common/javascript/tools/cookieTools'

export default({
  name: 'app',
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    const role = cookieTools.getCookie('role')
    if (role) {
      this.direct()
    } else {
      location.href = '#/login'
    }
  },
  methods: {
    direct () {
      dispatch.login()
    }
  }
})
</script>
