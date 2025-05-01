<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>
