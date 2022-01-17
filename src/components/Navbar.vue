<template>
    <nav class="navbar navbar-expand-lg navbar-light container">
        <div class="container-fluid">
            <router-link to="/"><a class="navbar-brand text-light">COIN - 42</a></router-link>
            <div class="text-light"><small>Developer- Yomi Aluko</small></div>

        </div>
    </nav>
    <router-view />
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>
