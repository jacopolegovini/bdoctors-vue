<script>
import axios from '../../axios';

export default {
    data() {
        return {
            sponsoredDoctors: [],
            loading: false,
            error: null
        }
    },
    methods: {
        async fetchSponsoredDoctors() {
            this.loading = true;
            try {
                const response = await axios.get('/api/sponsored-doctors');
                this.sponsoredDoctors = response.data;
            } catch (error) {
                this.error = 'Errore nel caricamento dei dottori sponsorizzati';
                console.error('Error:', error);
            } finally {
                this.loading = false;
            }
        }
    },
    created() {
        this.fetchSponsoredDoctors();
    }
}
</script>

<template>
    <main class="mt-4">
        <div class="container">
            <h2>Medici in evidenza</h2>

            <div v-if="loading" class="text-center">
                Caricamento...
            </div>

            <div v-else-if="error" class="alert alert-danger">
                {{ error }}
            </div>

            <div v-else class="row">
                <div v-for="doctor in sponsoredDoctors" :key="doctor.id" class="col-md-4 mb-4">
                    <div class="card">
                        <img :src="doctor.profile_image || 'https://media.istockphoto.com/id/1340883379/photo/young-doctor-hospital-medical-medicine-health-care-clinic-office-portrait-glasses-man.jpg?s=612x612&w=0&k=20&c=_H4VUPBkS0gEj5ZdZzQo-Hw3lMuyofJpB-P9yS92Wyw='"
                            class="card-img-top" :alt="doctor.name">
                        <div class="card-body">
                            <h5 class="card-title">{{ doctor.name }}</h5>
                            <p class="card-text">{{ doctor.specializations?.join(', ') }}</p>
                            <router-link :to="'/doctor/' + doctor.id" class="btn btn-primary">Profilo
                                medico</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
h2 {
    text-align: center;
    margin-bottom: 2rem;
}

.card {
    border-radius: 40px;
    background-color: #D8F9FF;
    flex-direction: column;
    align-items: center;
    border: 0;
    text-align: center;
    height: 100%;
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.card img {
    border-radius: 50%;
    width: 70%;
    border: 1px solid #65B0FF;
    margin-top: 10px;
    object-fit: cover;
    aspect-ratio: 1;
}

.btn-primary {
    background-color: #65B0FF;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
}

.btn-primary:hover {
    background-color: #4a9aff;
}
</style>