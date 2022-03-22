

<template>

<div v-if="$store.state.information.globalComponent == 'Admin'">
    <Admin />
</div>
<div v-else>
    <Site />
</div>

</template>

<script>
import Site from './components/site/Index'
import Admin from './components/admin/Index'

export default {
    name: 'Test',
    components: {
        Site, Admin
    }

};


</script>
