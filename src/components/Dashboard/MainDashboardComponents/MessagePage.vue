<script>
import { store } from '../../../../js/store.js'

export default {
    data() {
        return {
            store
        }
    },
    methods: {
    }
}
</script>

<template>
    <main class="container">
        <div class="general-cards-container">
            <div class="all-messages">
                <div class="card-inbox">
                    <div class="card-header-title">
                        <h5 class="title">Messaggi arrivati</h5>
                        <div class="messages-number"><strong>Totale:</strong> <span class="total-number">10</span></div>
                    </div>
                    <div class="card-body-list" v-for="(message, index) in 10">
                        <ul class="list-group list-group-flush list-email" @click="selectMessage(index)">
                            <li class="list-group-item">E-mail</li>
                        </ul>
                        <ul class="list-group list-group-flush list-name" @click="selectMessage(index)">
                            <li class="list-group-item">Nome e Cognome</li>
                        </ul>
                        <ul class="list-group list-group-flush list-preview" @click="selectMessage(index)">
                            <li class="list-group-item">Preview</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="selected-message">
                <div class="card-selected-message">
                    <h5 class="title">Messaggio selezionato</h5>

                    <div class="message-name">
                        <strong>Da:</strong> Mario Rossi
                    </div>
                    <div class="message-email">
                        <strong>E-mail:</strong> mariorossi@gmail.com
                    </div>
                    <div class="message-content">
                        <div><strong>Contenuto:</strong></div> <span>Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Veniam
                            velit officia quaerat
                            similique
                            ducimus excepturi dolore aliquam sed blanditiis maxime voluptas error perspiciatis sequi
                            officiis ullam delectus rerum, vero dolorem?</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Inbox Card */

.card-inbox::-webkit-scrollbar {
    width: 10px;
    position: relative;
    top: 0;
    right: 10px;
}

.card-inbox {
    border: 3px solid var(--color-complementary);
    border-radius: 20px;
    height: 300px;
    overflow: auto;
}

.card-header-title {
    padding: 10px 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: white;
}

.messages-number {
    border-radius: 20px;
    border: 3px solid var(--color-secondary);
    padding: 8px 15px;
    background-color: var(--color-secondary);
    color: white;
}

.total-number {
    font-weight: bold;
}

.card-body-list {
    display: flex;
    padding: 0 15px;
}

.list-email {
    flex-basis: 20%;
    border-right: 3px dashed var(--color-secondary);
    border-bottom: 3px solid var(--color-secondary);
}

.list-name {
    flex-basis: 20%;
    border-right: 3px dashed var(--color-secondary);
    border-bottom: 3px solid var(--color-secondary);
}

.list-preview {
    flex-basis: 60%;
    border-bottom: 3px solid var(--color-secondary);
}


/* Selected Message */
.card-selected-message {
    border: 3px solid var(--color-complementary);
    border-radius: 20px;
    padding: 15px;
}

.selected-message {
    margin-top: 40px;
}

.message-email,
.message-name,
.message-content {
    margin-top: 20px;
    padding-bottom: 5px;
}

.message-email,
.message-name {
    border-bottom: 2px dashed var(--color-secondary);
}

/* Is better with a space? */
/* .message-content {
    display: flex;
    gap: 10px;
} */
</style>