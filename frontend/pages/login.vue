<template>
    <div class="login">
        <div class="d-flex justify-content-center">
            <div class="login-card">
                <div class="d-flex justify-content-center">
                    <!-- Image -->
                </div>
                <h3 class="text-center">{{ $t('Авторизация') }}</h3>
                <form @submit.prevent="login">
                    <div class="field">
                        <label for="username" class="block text-900 text-xl font-medium mb-2">{{ $t('Логин') }}</label>
                        <InputText id="username" type="text" :placeholder="$t('Введите логин')" class="w-full"
                            style="width: 100%; padding: 10px 16px;" v-model="username" />
                        <small id="username_error" style="word-wrap: break-word;" class="p-error d-block mb-5">{{
                            username_error }}</small>
                    </div>
                    <div class="field mt-5">
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">{{ $t('Пароль') }}</label>
                        <Password :feedback="false" id="password" v-model="password" :placeholder="$t('Введите пароль')"
                            style="width: 100%" :toggleMask="true"
                            class="w-full d-flex justify-content-between align-items-center"></Password>
                        <small id="password_error" style="word-wrap: break-word;" class="p-error d-block mb-5">{{
                            password_error }}</small>
                    </div>
                    <Button :disabled="loading" :icon="loading ? 'pi pi-spin pi-spinner' : 'pi pi-sign-in'" type="submit"
                        :label="$t('Вход')" class="w-full p-2" style="width: 100%;"></Button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useToken } from "~/composables/token"
import { toggleDark } from "~/composables/dark"
export default {
    name: "Login",
    data() {
        return {
            username: null,
            password: null,
            password_error: null,
            username_error: null,
            loading: false
        }
    },
    methods: {
        toggleDark,
        login() {
            this.loading = true
            navigateTo('/')
            // this.$api.post("/oauth/auth/", { username: this.username, password: this.password }).then((response) => {
            //     if (response.status == 201) {
            //         useToken.value = response.data
            //         navigateTo('/')
            //     } else {
            //         this.error({response})
            //     }
            // }).catch(this.error).finally(() => {
            //     this.loading = false
            // })
        },
        error(e) {
            const detail = e.response.data.detail
            if (detail) {
                this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: detail.join(". "), life: 5000 });
                delete e.response.data.detail
            }
            this.username_error = e.response.data.username ? e.response.data.username.join(". ") : null
            this.password_error = e.response.data.password ? e.response.data.password.join(". ") : null
        }
    }
}
</script>
<style>
.login-card {
    width: 442px;
    /* height: 576px; */
    background-color: var(--surface-card);
    border-radius: 16px;
    padding: 48px;
    box-shadow: 0px 4px 234px 0px #33333314;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

#password>input {
    width: 100% !important
}

#password>svg {
    right: 0.75rem;
}

.login {
    background-color: var(--surface-ground);
    height: 100vh;
}</style>