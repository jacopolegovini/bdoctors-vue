<script>
import axios from "axios";
import Multiselect from "../Generics/Multiselect.vue";


export default {
    data() {
        return {
            formData: {
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                phone: "",
                officeAddress: "",
                specialization: [],
                services: "",
                photo: "",
                curriculum: ""
            },
            apiUrl: "",
            errors: [],
            validated: false,
        }
    },
    components: {
        Multiselect
    },
    methods: {
        // updateForm() {

        //     axios.post('/user', this.formData)
        //         .then((response) => {
        //             console.log(response);
        //             console.log("Updated form");
        //         })
        //         .catch((error) => {
        //             this.errors = response.result.errors;
        //             console.log(response.result.errors);
        //         });

        // redirect
        // this.$router.push({ name: 'routename' })
        // },

        validateForm() {
            this.errors = [];
            if (!this.formData.firstname) {
                this.errors.push("Il nome è obbligatorio.")
            } else if (this.formData.firstname.length <= 2) {
                this.errors.push("Il nome deve contenere almeno 2 caratteri.")
            };
            if (!this.formData.lastname) {
                this.errors.push("Il cognome è obbligatorio.")
            } else if (this.formData.lastname.length <= 2) {
                this.errors.push("Il cognome deve contenere almeno 2 caratteri.")
            };
            if (!this.formData.email) {
                this.errors.push("L'email è obbligatoria.");
            } else if (!this.validEmail(this.formData.email)) {
                this.errors.push("L'email inserita non è valida.");
            }
            if (!this.formData.password) { this.errors.push("La password è obbligatoria.") }
            else if (!this.validPassword(this.formData.password)) { this.errors.push("La password deve contenere almeno una maiuscola, una minuscola ed un numero") };
            if (!this.formData.phone) { this.errors.push("Il numero di telefono è obbligatorio.") }
            else if (isNaN(this.formData.phone)) { this.errors.push("Il numero di telefono può contenere solo numeri") };
            if (!this.formData.officeAddress) this.errors.push("L'indirizzo è obbligatorio.");
            if (!this.formData.specialization) this.errors.push("Inserire almeno una specializzazione.");
            if (!this.formData.services) this.errors.push("Inserire almeno una prestazione.");
            if (!this.formData.photo) this.errors.push("La foto è obbligatoria");
            if (!this.formData.curriculum) this.errors.push("Il curriculum è obbligatorio.");

            if (!this.errors.length) {
                this.validated = true;
                return true;
            };
            console.log(this.formData);
            console.log(this.errors);
        },
        validEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPassword(password) {
            const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            let isLowercase = false;
            let isUppercase = false;
            let isNumber = false;

            for (let i = 0; i < password.length; i++) {
                const char = password[i];
                if (lowercase.includes(char)) isLowercase = true;
                if (uppercase.includes(char)) isUppercase = true;
                if (numbers.includes(char)) isNumber = true;
            }

            return isLowercase && isUppercase && isNumber;
        },

        updateSpecs(specializations) {
            this.formData.specialization = specializations;
            console.log(this.formData.specialization);
        },
    },
}
// computed: {
//     openProfile() {
//         // Once the user's been redirected to his profile, the modal's backdrop disappears
//         const backdrop = document.querySelector('.modal-backdrop');
//         if (backdrop) {
//             backdrop.remove();
//         }
//         // redirect to user profile
//         this.$router.push('/user/:id');
//     }
// },

// mounted() {
//     axios.get(this.apiUrl)
//         .then(function (response) {
//             // handle success
//             console.log(response);
//         })
//         .catch(function (error) {
//             // handle error
//             console.error(error);
//         })
//         .finally(function () {
//             // always executed
//         });
// }
// }

</script>

<template>
    <div class="container py-3">
        <h1 class="text-center">Modifica le tue informazioni</h1>

        <form action="" method="PUT" @submit.prevent="validateForm">

            <div v-if="errors.length" class="bg-subtle-danger" id="errors">
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
            <div class="row py-4 my-4" id="edit-form">
                <div class="mb-3 col-4">
                    <label for="firstname" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="firstname" v-model="formData.firstname">
                </div>
                <div class="mb-3 col-4">
                    <label for="lastname" class="form-label">Cognome</label>
                    <input type="text" class="form-control" id="lastname" v-model="formData.lastname">
                </div>
                <div class="mb-3 col-4">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="formData.email">
                </div>
                <div class="mb-3 col-6">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="formData.password">
                </div>
                <div class="mb-3 col-6">
                    <label for="phone" class="form-label">Telefono</label>
                    <input type="tel" class="form-control" id="phone" v-model="formData.phone">
                </div>
                <div class="mb-3 col-6">
                    <label for="officeAddress" class="form-label">Indirizzo</label>
                    <input type="text" class="form-control" id="officeAddress" v-model='formData.officeAddress'>
                </div>
                <!-- <div class="mb-3 col-6">
                    <label for="specialization" class="form-label">Specializzazioni</label>
                    <select class="form-select" aria-label="Default select example" id="specialization"
                        v-model="formData.specialization" >
                        <option disabled selected>Seleziona la/e tua/e specializzazione/i</option>
                        <option value="surgery">Chirurgia</option>
                        <option value="cardiology">Cardiologia</option>
                        <option value="ophthalmology">Oculistica</option>
                    </select>
                </div> -->
                <div class="mb-3 col-6">
                    <label for="specialization" class="form-label">Specializzazioni</label>
                    <Multiselect @send-values="updateSpecs" />
                </div>
                <div class="mb-3">
                    <label for="services" class="form-label">Prestazioni</label>
                    <textarea class="form-control" id="services" v-model="formData.services"></textarea>
                </div>
                <div class="mb-3">
                    <label for="photo" class="form-label">Foto profilo</label>
                    <input type="url" class="form-control" id="photo" placeholder="Inserisci un URL valido"
                        v-model="formData.photo">
                </div>
                <div class="mb-3">
                    <label for="curriculum" class="form-label">Curriculum Vitae</label>
                    <input type="url" class="form-control" id="curriculum" placeholder="Inserisci un URL valido"
                        v-model="formData.curriculum">
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn me-2 btn-submit">Modifica</button>
                    <button type="reset" class="btn btn-reset">Reset</button>
                    <!-- <button type="submit" class="btn me-2 btn-submit"
                     data-bs-toggle="modal" data-bs-target="#modal">Modifica</button>
                    <button type="reset" class="btn btn-reset">Reset</button> -->
                </div>

                <!-- Modal -->
                <!-- <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true" v-if="validated">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                I tuoi dati sono stati aggiornati.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="openProfile">
                                    Torna al profilo
                                </button>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </form>
    </div>

</template>

<style scoped lang="scss">
#edit-form,
#errors {
    border: 1px solid;
    border-radius: 20px;
}

.btn-submit {
    background-color: var(--color-secondary);
}

.btn-reset {
    background-color: var(--color-tertiary);
    color: white;

    &:hover {
        color: black;
    }
}
</style>
