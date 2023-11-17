<template>
  <div class="d-flex flex-column align-start">
    <h1 class="mb-3">User list</h1>

    <div class="w-100 d-flex align-center justify-space-between mb-5">
      <div class="w-50">
        <SearchBar @search="handleSearch" />
      </div>
      <v-btn color="green" class="rounded-pill" @click="$router.push('/add-user')">
        <v-icon icon="mdi-plus" />
        Add user
      </v-btn>
    </div>

    <UserList :userList="userList.data" @fetchUsers="fetchUsers(currentPage)" />

    <v-pagination
        color="green"
        v-if="userList"
        class="mt-6 mx-auto mx-md-0"
        :length="userList.total_pages"
        :total-visible="7"
        v-model="currentPage"
    ></v-pagination>
  </div>
</template>

<script setup>
import axios from 'axios';
import { watch, onMounted, ref } from 'vue';
import SearchBar from "@/components/SearchBar";
import UserList from '@/components/UserList';

const userList = ref([]);
const currentPage = ref(1);

const handleSearch = (searchPhrase) => {
  if (searchPhrase.length !== 0) {
    const lowerCasedPhrase = searchPhrase.toLowerCase();

    userList.value.data = userList.value.data.filter(user => {
      const fName = user.first_name?.toLowerCase();
      const lName = user.last_name?.toLowerCase();
      return fName.includes(lowerCasedPhrase) || lName.includes(lowerCasedPhrase);
    })
  } else {
    fetchUsers(currentPage.value)
  }
};

const fetchUsers = (page = 1) => {
  axios.get('https://reqres.in/api/users', {
    params: {
      page
    }
  })
      .then(response => {
        userList.value = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
}

watch(currentPage, (newVal, oldVal) => newVal !== oldVal && fetchUsers(newVal));


onMounted(() => {
  fetchUsers()
})
</script>

<style lang="scss">
.user{
  &-list-view {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &-list-item {
    width: 100%;
    display: flex;
    align-items: center;
  }
  &-avatar {
    border-radius: 50%;
    width: 50px;
  }
}
</style>
