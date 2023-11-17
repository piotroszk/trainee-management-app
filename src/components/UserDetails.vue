<template>
  <div class="user-details w-100">
    <v-row>
      <v-col order-md="1" cols="12" md="5">
        <div class="user-details-box pa-5 border-md d-flex flex-column justify-space-between">
          <div>
            <v-avatar class="mb-5" color="grey" icon="mdi-account" :image="user.avatar" size="100" />
          </div>
          <div>
            <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Change photo"
                hide-details="auto"
                density="compact"
                v-model="file"
                @change="onFileChange"
            ></v-file-input>
          </div>
        </div>
      </v-col>

      <v-col order-md="0" cols="12" md="7">
        <div class="user-details-box pa-5 border-md d-flex flex-column justify-space-between">
          <div class="d-flex ga-5">
            <v-text-field
                density="compact"
                hide-details="auto"
                v-model="user.first_name"
                label="First Name"
            ></v-text-field>
            <v-text-field
                density="compact"
                hide-details="auto"
                v-model="user.last_name"
                label="Last Name"
            ></v-text-field>
          </div>
          <v-btn class="float-left align-self-baseline" color="green"
                 @click="isEditing ? updateUser(route.params.id) : addUser()">
            {{ isEditing ? 'Update details' : 'Add user' }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";

const route = useRoute();
const router = useRouter();

const file = ref(null);

const user = ref({
  avatar: '',
  first_name: '',
  last_name: ''
});

const isEditing = computed(() => {
  return !!route.params.id;
});

const onFileChange = () => {
  if (file.value[0] instanceof Blob || file.value[0] instanceof File) {
    const reader = new FileReader();

    reader.onload = () => {
      user.value.avatar = reader.result;
    };

    reader.readAsDataURL(file.value[0]);
  } else {
    console.error('Selected file is not a valid Blob or File object.');
  }
}

const fetchUser = (id) => {
  axios.get(`https://reqres.in/api/users/${id}`)
      .then(response => {
        user.value = response.data.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
}

const updateUser = (id) => {
  const { avatar, first_name, last_name } = user.value;

  axios.put(`https://reqres.in/api/users/${id}`, {
    avatar,
    first_name,
    last_name
  })
      .then(() => {
        router.push('/')
      })
      .catch(error => {
        console.error('Error updating data:', error);
      })
}

const addUser = () => {
  const { avatar, first_name, last_name } = user.value;

  if (first_name.length === 0 || last_name.length === 0) {
    alert('You have to provide firstname and lastname');

    return
  }

  axios.post(`https://reqres.in/api/users/`, {
    avatar,
    first_name,
    last_name
  })
      .then(() => {
        router.push('/')
      })
      .catch(error => {
        console.error('Error updating data:', error);
      })
}

onMounted(() => {
  if (route.params.id) {
    fetchUser(route.params.id)
  }
})
</script>

<style lang="scss">
  .user-details-box {
    height: 250px;
  }
</style>
