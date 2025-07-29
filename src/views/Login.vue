<script setup lang="ts">
import {onMounted, ref, nextTick} from 'vue';
import {useRouter} from 'vue-router';
const showed_container_name = ref('intro_container');
const ref_book_name_input = ref<HTMLInputElement | null>(null);
const ref_password_input = ref<HTMLInputElement | null>(null);
const book_name = ref('');
const password = ref('');
const router = useRouter();
const openBook = () => {
    showed_container_name.value = 'bookname_container';
    nextTick(() => {
        ref_book_name_input.value?.focus();
    });
};
const getBookName = () => {
    if (book_name.value) {
        showed_container_name.value = 'password_container';
        nextTick(() => {
        ref_password_input.value?.focus();
        });
    }
};
const getPassword = () => {
    if (password.value) {
        // Handle password logic here
        router.push({ name: 'Notebook' }); // Navigate to the main application view
    }
};
</script>
<template>
    <div class="container">
        <div v-if="showed_container_name === 'intro_container'" class="intro_container">
            <div class="text_container">
                <h1>YoNotebook</h1>
                <p>Welcome to Yo Notebook</p>
                <p>your personal notebook application.</p>
            </div>
            <button @click="openBook">Open Yo Notebook</button>
        </div>
        <div v-show="showed_container_name === 'bookname_container'" class="bookname_container">
            <input id="book_name_input" ref="ref_book_name_input" type="text" placeholder="Enter your book name" v-model="book_name" @keyup.enter="getBookName" />
            <div class="tips_container">
                <p v-if="book_name">enter</p>
            </div>
        </div>
        <div v-show="showed_container_name === 'password_container'" class="password_container">
            <input  ref="ref_password_input" type="password" placeholder="Enter your password" v-model="password" @keyup.enter="getPassword" />
            <p class="tips_container">
                <p v-if="password">enter</p>
            </p>
        </div>
    </div>
</template>  
<style lang="scss" scoped>
.container{
    height: 100%;
    width: 100%;
    background-color: black;
    color: white;
    position: relative;
    .intro_container,
    .bookname_container,
    .password_container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }   
    .intro_container{
        .text_container{
            text-align: center;
            margin-top: 20px;
            border: solid 1px white;
            width: 500px;
            height: auto;
            h1{
                text-align: center;
            }
            p{
                text-align: center;
            }
        }
        button{
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: white;
            color: black;
            border: none;
            cursor: pointer;
        }
    }
    .bookname_container,.password_container{
        .tips_container{
            height: 30px;
            text-align: center;
            color: white;
        }
    }
    .bookname_container{
        input{
            width: 300px;
            padding: 10px;
            border: solid 1px white;
            border-radius: 5px;
            margin-bottom: 10px;
            background-color: black;
            color: white;
        }
    }
    .password_container{
        input{
            width: 300px;
            padding: 10px;
            border: solid 1px white;
            border-radius: 5px;
            background-color: black;
            color: white;
        }
    }
}
</style>