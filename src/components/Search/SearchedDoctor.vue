<script>
import axios from 'axios';
import { store } from '../../../js/store';
import DoctorShow from './DoctorShow.vue';
import { RouterLink } from 'vue-router';
import { finiteOrDefault } from 'chart.js/helpers';

export default {
    data() {
        return {
            store,
            searchedDoctor: [],
            apiUrl: 'http://localhost:8000/api/profiles',
            specializationApiUrl: 'http://127.0.0.1:8000/api/specializations',
            reviewsApiURl: 'http://localhost:8000/api/reviews',
            specializationId: store.searchedSpecialization,
            specializationName: '',
            doctors: [],
            rating: null,
            inputReviews: null,
            loaded: false,
            showDoctor: false,
            filteredDoctors: [],
        }
    },
    components: {
        DoctorShow,
    },
    methods: {
        getApiProfile() {
            axios.get(this.apiUrl)
                .then(response => {
                    let profiles = response.data.profiles

                    // Not the best solution but it works
                    // It filter every profiles we have and push it in an empty array that includes only the profiles with the correct specialization
                    let filteredProfiles = []
                    for (let i = 0; i < profiles.length; i++) {
                        let profile = profiles[i]
                        if (profile.user.specializations[0].id == store.searchedSpecialization) {
                            filteredProfiles.push(profile)

                        }
                        let specializationsProfile = profile.user.specializations
                        if (specializationsProfile.length === 2) {
                            if (profile.user.specializations[1].id == store.searchedSpecialization) {
                                filteredProfiles.push(profile)
                            }
                        }
                    }
                    this.doctors = filteredProfiles
                    console.log('Dottori nei data', this.doctors)

                    this.specializations = response.data.specializations;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getSpecializationName() {
            axios.get(this.specializationApiUrl)
                .then(response => {
                    // handle success
                    console.log(response.data.specializations);
                    let specializationArray = response.data.specializations
                    for (let i = 0; specializationArray.length; i++) {
                        let specialization = specializationArray[i]
                        if (store.searchedSpecialization === specialization.id) {
                            this.specializationName = specialization.name
                            return
                        }
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        },

        goToShowPage(doctor) {
            let completeName = "";
            completeName = doctor.first_name + '-' + doctor.last_name
            store.doctorProfile = doctor;
            this.$router.push({
                name: 'search.show', params: { searchId: store.selectedSpecializationName.trim().replace(/ /g, "-").toLowerCase(), id: completeName.toLowerCase() }
            })
        },

        getFilteredReviews() {
            let url = `http://localhost:8000/api/reviews/filter/${this.specializationId}/${this.rating}/${this.inputReviews}`;

            axios.get(url, {
            })
                .then(response => {
                    // handle success
                    console.log('RECENSIONI FILTRATEEEE', response.data);
                    this.filteredDoctors = response.data;
                    this.filteredDoctors.id = store.informationPageId;
                    console.log('filtered doctors:', this.filteredDoctors)

                    this.$router.push({
                        name: 'search',
                        params: {
                            searchId: store.selectedSpecializationName.trim().replace(/ /g, "-").toLowerCase(),
                            ...(this.rating !== null && this.rating !== undefined ? { inputRating: `input-rating:${this.rating}` } : {}),
                            ...(this.inputReviews !== null && this.inputReviews !== undefined ? { inputReviews: `input-reviews:${this.inputReviews}` } : {})
                        }
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error)
                    console.log(error.response.data.message);
                })
        },

        resetInputs() {
            this.rating = null;
            this.inputReviews = null;
            this.getFilteredReviews();
        },
    },
    computed: {
        showLoader() {
            setTimeout(() => {
                this.loaded = true
            }, 2000)
        }
    },
    created() {
        // this.getApiProfile();
        this.getFilteredReviews();
        this.getSpecializationName();
    },
    mounted() {
        this.showLoader
    }
}
</script>

<template>
    <main class="container">
        <!-- Loader -->
        <div class="loader" v-if="!loaded"></div>

        <!-- Components -->
        <div v-if="loaded">
            <div>
                <div class="title">
                    <h2>Risultati per: <span class="specialization-title">{{ specializationName }} </span><span
                            v-if="!filteredDoctors.length" class="total-specialization-doctor"> (Totale esperti:
                            {{
                                doctors.length
                            }})</span>
                        <span v-else class="total-specialization-doctor"> (Totale esperti: {{
                            filteredDoctors.length }})</span>
                    </h2>
                </div>

                <div class="advanced-filter">
                    <!-- Average Votes Filter Input -->
                    <div class="average-votes">
                        <div class="votes d-flex align-items-center">
                            <p class="me-2">Filtra per media voti: </p>
                            <div class="rating">
                                <form method="get" class="form-control rating" @submit.prevent="getFilteredReviews">
                                    <button type="submit" class="btn btn-sm btn-secondary ms-2"
                                        :class="{ 'disabled': rating === null }">Filtra</button>
                                    <input type="radio" id="vote5" name="rating" value="5" v-model="rating">
                                    <label for="vote5"><i class="fa-solid fa-stethoscope"></i>
                                    </label>
                                    <input type="radio" id="vote4" name="rating" value="4" v-model="rating">
                                    <label for="vote4"><i class="fa-solid fa-stethoscope"></i>
                                    </label>
                                    <input type="radio" id="vote3" name="rating" value="3" v-model="rating">
                                    <label for="vote3"><i class="fa-solid fa-stethoscope"></i>
                                    </label>
                                    <input type="radio" id="vote2" name="rating" value="2" v-model="rating">
                                    <label for="vote2"><i class="fa-solid fa-stethoscope"></i>
                                    </label>
                                    <input type="radio" id="vote1" name="rating" value="1" v-model="rating">
                                    <label for="vote1"><i class="fa-solid fa-stethoscope"></i>
                                    </label>
                                </form>
                            </div>
                        </div>

                    </div>

                    <!-- Reviews Number Filter Input-->
                    <div class="reviews-number">
                        <p>Filtra per numero di recensioni:</p>
                        <form method="GET" class="form-control d-flex" @submit.prevent="getFilteredReviews">
                            <input type="number" class="form-control" id="reviews" name="reviews" min="0"
                                v-model="inputReviews">
                            <button type="submit" :class="{ 'disabled': inputReviews === null }"
                                class="btn btn-sm btn-secondary ms-2">Filtra</button>
                        </form>
                    </div>

                    <!-- Reset Input Fields Button -->
                    <button type="reset" class="btn btn-sm btn-primary"
                        :class="{ 'disabled': rating === null && inputReviews === null }" @click="resetInputs">Cancella
                        Filtri</button>
                </div>

                <div class="doctors-list" v-if="filteredDoctors.length">
                    <div class="doctor-card" v-for="(doctor) in filteredDoctors" @click="goToShowPage(doctor)">
                        <img src="https://media.istockphoto.com/id/1340883379/photo/young-doctor-hospital-medical-medicine-health-care-clinic-office-portrait-glasses-man.jpg?s=612x612&w=0&k=20&c=_H4VUPBkS0gEj5ZdZzQo-Hw3lMuyofJpB-P9yS92Wyw="
                            class="doctor-photo" alt="doctor photo">
                        <section class="doctor-information">
                            <h5 class="doctor-name">
                                {{ doctor.first_name }} {{ doctor.last_name }}
                            </h5>
                            <div class="doctor-address">
                                <strong>Ufficio:</strong> {{ doctor.office_address }}
                            </div>
                            <div class="doctor-average">
                                <strong>Media voti:</strong> {{ doctor.media_voti ? doctor.media_voti : "-" }}
                            </div>
                            <div class="doctor-reviews">
                                <strong>Recensioni ricevute:</strong> {{ doctor.totalReviews ? doctor.totalReviews : "-"
                                }}
                            </div>
                        </section>
                    </div>
                </div>
                <div v-else>
                    <p>Nessun risultato trovato</p>
                </div>

            </div>
        </div>
        <div v-else-if="filteredDoctors.length"></div>
    </main>
</template>

<style scoped>
h5 {
    margin-bottom: 15px;
    text-align: center;
}

.title {
    text-align: center;
    margin: 30px 0 20px 0;
}

.specialization-title {
    text-transform: lowercase;
    font-weight: 400;
}

.advanced-filter {
    border: #65B0FF 2px solid;
    border-radius: 20px;
    margin: 20px 0;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
}

/*Rating */
.rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;

    & input {
        display: none;
    }

    & label {
        font-size: 24px;
        cursor: pointer;
    }

    & label:hover,
    & label:hover~label {
        color: var(--color-complementary)
    }

    & input:checked~label {
        color: var(--color-complementary)
    }
}

.reviews-number {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

/* Doctor list */
.doctors-list {
    display: flex;
    gap: 50px 110px;
    justify-content: start;
    flex-wrap: wrap;
    align-content: stretch;
    margin-top: 30px;

}

.doctors-list> :hover {
    scale: 1.1;
    cursor: pointer;
    transition: 0.8s;
}



.total-specialization-doctor {
    font-style: oblique;
    font-weight: normal;
    font-size: 1.2rem;
}

.doctor-card {
    background-color: #D8F9FF;
    padding: 25px 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
    width: calc((100% / 3) - 80px);
    border-radius: 30px;

    /* height: 400px; */
}

img {
    border-radius: 50%;
    border: 3px solid #65B0FF;
    height: 200px;
}

.button-profile-show {
    background-color: var(--color-secondary);
    border-radius: 20px;
    padding: 8px 15px;
    text-decoration: none;
    color: var(--color-primary);
    font-weight: bold;
    border: 1px solid var(--color-primary);
}


/* Loader progressive */
.loader {
    --r1: 154%;
    --r2: 68.5%;
    width: 60px;
    aspect-ratio: 1;
    border-radius: 50%;
    background:
        radial-gradient(var(--r1) var(--r2) at top, #0000 79.5%, var(--color-secondary) 80%),
        radial-gradient(var(--r1) var(--r2) at bottom, var(--color-secondary) 79.5%, #0000 80%),
        radial-gradient(var(--r1) var(--r2) at top, #0000 79.5%, var(--color-secondary) 80%),
        #ccc;
    background-size: 50.5% 220%;
    background-position: -100% 0%, 0% 0%, 100% 0%;
    background-repeat: no-repeat;
    animation: l9 2s infinite linear;
    position: absolute;
    top: 50%;
    left: 50%;
}

@keyframes l9 {
    33% {
        background-position: 0% 33%, 100% 33%, 200% 33%
    }

    66% {
        background-position: -100% 66%, 0% 66%, 100% 66%
    }

    100% {
        background-position: 0% 100%, 100% 100%, 200% 100%
    }
}



/* Media Queries */

/* Mobile */
@media (max-width: 768px) {

    .advanced-filter {
        flex-direction: column;
        align-items: flex-start;
    }

    .average-votes,
    .reviews-number {
        width: 100%;
        margin-bottom: 15px;
    }

    .advanced-filter button {
        width: 100%;
        margin-top: 15px;
    }

    .doctors-list {
        gap: 20px;
        justify-content: center;
    }

    .doctor-card {
        width: calc(100% - 40px);
        margin: 5px;
    }

    .title h2 {
        font-size: 1.4rem;
    }

    .doctor-card img {
        height: 150px;
        width: 150px;
    }

    .doctor-name h5 {
        font-size: 1rem;
    }

    .doctor-information {
        text-align: start;
    }

    .average-votes {
        width: 100%;
    }
}

/* Large Mobile Screens */

@media (max-width: 480px) {
    .doctors-list {
        gap: 15px;
    }

    .doctor-card {
        width: calc(100% - 20px);
        /* Ensure 1 card per row on very small screens */
    }

    .doctor-name {
        font-size: 0.9rem;
    }

    .doctor-address,
    .doctor-average,
    .doctor-reviews {
        font-size: 0.8rem;
    }

    .rating {
        font-size: 20px;
        flex-grow: 1;
        align-items: center;
        flex-wrap: no-wrap;
        gap: 5px;
    }

    .votes {
        flex-wrap: wrap;
    }

    .average-votes,
    .reviews-number {
        flex-direction: column;
        align-items: flex-start;
    }

    button {
        width: 100%;
    }

    .title h2 {
        font-size: 1.2rem;
    }

    .doctor-card img {
        height: 120px;
        width: 120px;
    }
}

/* Desktop (above 1024px) */
@media (min-width: 1024px) {
    .doctors-list {
        gap: 50px 110px;
    }

    .doctor-card {
        width: calc((100% / 3) - 80px);
        /* 3 cards per row */
    }
}
</style>