<template>
  <v-table class="w-100">
    <thead>
      <tr>
        <th class="text-left" />
        <th class="text-left font-weight-bold">
          Full name
        </th>
        <th class="text-right font-weight-bold">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
          v-for="user in props.userList"
          :key="user.id"
      >
        <td class="text-left pa-4">
          <img class="user-avatar d-block" :src="user.avatar" alt="">
        </td>
        <td class="text-left w-100">
          {{ user.first_name }} {{ user.last_name }}
        </td>
        <td class="text-right">
          <v-icon icon="mdi-file-edit-outline" @click="editUser(user.id)" />
          <v-icon icon="mdi-delete" @click="deleteUser(user.id)" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import axios from "axios";
import { defineEmits, defineProps } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();
const emit = defineEmits(['fetchUsers']);
const props = defineProps(['userList']);

const editUser = (userId) => {
  router.push('/update-user/' + userId);
}

const deleteUser = (userId) => {
  axios.delete(`https://reqres.in/api/users/${userId}`)
      .then(() => {
        alert(`User ${userId} was successfully deleted`);
        emit('fetchUsers');
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      })
}
</script>

<style lang="scss" scoped>
  tbody {
    tr:nth-child(odd) {
      background-color: #F5F7F9;
    }
  }
</style>
