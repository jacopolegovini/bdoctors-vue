import { reactive } from 'vue'


export const store = reactive({
  // Variable for change content inside dashboard
  informationPage: true,
  messagePage: false,
  reviewPage: false,
  sponsorshipPage: false,
  statisticPage: false,
  searchedSpecialization: null,

  // test route guard
  responseStatus: false,

  // Variable for toggle sidebar inside dashboard
  sidebar: true,

  // Api uri
  apiUri: 'http://localhost:8000/api/',
  // Api call for profile information
  informationPageId: ''
})