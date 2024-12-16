<script>
import VueMultiselect from 'vue-multiselect';
import axios from '../../plugins/axios';

export default {
    data() {
        return {
            value: [],
            options: [],
            apiUrl: "http://127.0.0.1:8000/api/specializations", // Use full URL
            loading: false,
            error: null,
            retryCount: 0
        }
    },
    props: {
        specializations: {
            type: Array,
            default: () => []
        }
    },
    components: { VueMultiselect },
    methods: {
        // Get Specializations through API call
        async getSpecializations() {
            if (this.retryCount >= 3) {
                this.error = 'Impossibile caricare le specializzazioni. Riprova più tardi.';
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(this.apiUrl, {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://127.0.0.1:8000',
                        'Access-Control-Allow-Credentials': true
                    }
                });
                console.log('API Response:', response.data);

                if (response.data.success && Array.isArray(response.data.specializations)) {
                    this.options = response.data.specializations;
                    if (this.specializations && this.specializations.length > 0) {
                        this.value = this.specializations;
                    }
                } else {
                    console.error('Invalid response format:', response.data);
                    this.error = 'Formato risposta non valido';
                    this.retryAfterDelay();
                }
            } catch (error) {
                console.error('Error fetching specializations:', error);
                this.error = 'Errore nel caricamento delle specializzazioni';
                this.retryAfterDelay();
            } finally {
                this.loading = false;
            }
        },

        retryAfterDelay() {
            this.retryCount++;
            if (this.retryCount < 3) {
                setTimeout(() => {
                    this.getSpecializations();
                }, 2000 * this.retryCount);
            }
        },

        //send specializations to parent component
        sendValues() {
            if (this.value && this.value.length > 0) {
                this.$emit('send-values', this.value);
            }
        },

        // method to show only the specialization name as options
        nameOnly({ name }) {
            return name;
        },
    },
    created() {
        this.getSpecializations();
    },
    watch: {
        specializations: {
            immediate: true,
            handler(newVal) {
                if (newVal && newVal.length > 0) {
                    this.value = newVal;
                }
            }
        }
    }
}
</script>

<template>
    <div>
        <VueMultiselect v-model="value" :options="options" :multiple="true" :close-on-select="false"
            :clear-on-select="false" track-by="name" placeholder="Seleziona una o più specializzazioni" label="name"
            :preserve-search="true" :show-labels="true" @update:modelValue="sendValues" :custom-label="nameOnly"
            :loading="loading">
            <template v-slot:noResult>
                Nessuna specializzazione trovata
            </template>
            <template v-slot:noOptions>
                {{ loading ? 'Caricamento specializzazioni...' : 'Nessuna opzione disponibile' }}
            </template>
        </VueMultiselect>
        <div v-if="error" class="text-danger mt-2">
            {{ error }}
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped lang="scss">
.invalid-input {
    border-color: red;
}

.text-danger {
    color: red;
    font-size: 0.875rem;
}
</style>