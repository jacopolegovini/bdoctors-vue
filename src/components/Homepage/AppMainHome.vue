<script>
import SponsoredDoctors from './SponsoredDoctors.vue';

export default {
    data() {
        return {

        }
    },
    components: {
        SponsoredDoctors,
    }
}
</script>

<template>
    <SponsoredDoctors />
    <!-- <main>
        <div class="container normal-doctor-container">
            <h2>Tutti i nostri dottori</h2>
            <div class="card-container">
                <div class="card d-flex" style="width: 18rem;" v-for="doctor in 15">
                    <img src="https://media.istockphoto.com/id/1340883379/photo/young-doctor-hospital-medical-medicine-health-care-clinic-office-portrait-glasses-man.jpg?s=612x612&w=0&k=20&c=_H4VUPBkS0gEj5ZdZzQo-Hw3lMuyofJpB-P9yS92Wyw="
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Nome medico</h5>
                        <p class="card-text">Specializzazioni medico</p>
                        <a href="#" class="btn btn-primary">Profilo medico</a>
                    </div>
                </div>
            </div>
        </div>
    </main> -->
</template>

<style scoped>
/* Common style and normal doctor */
h2 {
    text-align: center;
    margin-bottom: 20px;

}

.card-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.card-container .card {
    border-radius: 40px;
    background-color: #D8F9FF;
    flex-direction: column;
    align-items: center;
    border: 0;
    text-align: center;
    flex-basis: 240px;
}

.card img {
    border-radius: 50%;
    width: 70%;
    border: 1px solid var(--color-primary);
    margin-top: 10px;
}
</style>