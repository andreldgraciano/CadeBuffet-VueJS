const app = Vue.createApp({
  data(){
    return{
      searchText: '',

      listBuffets: [],

      listEvents: [],

      dateText: null,

      amountPeople: null,

      page: 'buffets'
    }
  },

  watch: {
    searchText(newValue) {
      if (newValue && this.page !== 'buffets') {
        this.page = 'buffets';
      }
    }
  },

  computed:{
    listResultBuffets(){
      if(this.searchText){
        return this.listBuffets.filter(contact => {
          return contact.brand_name.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }else{
        return this.listBuffets;
      }
    }
  },

  async mounted() {
    this.listResultBuffets = await this.getBuffets();
  },

  methods: {

    buttonBuffets(){
      this.page = 'buffets',
      this.searchText = ''
    },

    handleClick(BuffetId) {
      this.searchText = '',
      this.page = 'buffet'
      this.selectedBuffet = this.listResultBuffets.find(buffet => buffet.id === BuffetId);
      this.getEvents(BuffetId)
    },

    async checkStatus(eventId){
      let date = this.dateText;
      let amount_people = this.amountPeople;
      console.log("eventId:", eventId);
      console.log("Selected Date:", date);
      console.log("Amount of People:", amount_people);

      let response = await fetch('http://localhost:3000/api/v1/events/' + eventId + '?date=' + date + '&amount_people=' + amount_people);
      let data = await response.json();
      
      let event = this.listEvents.find(event => event.id === eventId);
      if (event) {
        event.status = data.status;
        if (data.status === 'Available') {
          event.name = data.name;
          event.date = date;
          event.amount_people = amount_people;
          event.total_value = data.total_value;
        }else if (data.status === 'Event unavailable for this number of people') {
          event.min_people = data.min_people;
          event.max_people = max_people;
        }
      }
    },

    async getBuffets(){
      let response = await fetch('http://localhost:3000/api/v1/buffets');
      let data = await response.json();
      this.listBuffets = [];
      
      data.forEach(item =>{
        var buffet = new Object();

        buffet.id = item.id;
        buffet.brand_name = item.brand_name;
        buffet.description = item.description;
        buffet.phone = item.phone;
        buffet.email = item.email;
        buffet.address = item.address;
        buffet.district = item.district;
        buffet.state = item.state;
        buffet.city = item.city;
        buffet.zip_code = item.zip_code;
        buffet.payment = item.payment;

        this.listBuffets.push(buffet);
      })
    },

    async getEvents(BuffetId){
      let response = await fetch('http://localhost:3000/api/v1/events_buffet/' + BuffetId);
      let data = await response.json();
      this.listEvents = [];
      
      data.forEach(item =>{
        var event = new Object();

        event.id = item.id;
        event.name = item.name;
        event.description = item.description;
        event.min_people = item.min_people;
        event.max_people = item.max_people;
        event.duration = item.duration;
        event.menu = item.menu;
        event.address = item.address;
        event.alcoholic_drink = item.alcoholic_drink;
        event.decoration = item.decoration;
        event.parking = item.parking;
        event.venue_preference = item.venue_preference;
        event.base_price = item.base_price;
        event.additional_per_person = item.additional_per_person;
        event.value_extra_hour = item.value_extra_hour;
        event.base_price_weekend = item.base_price_weekend;
        event.additional_per_person_weekend = item.additional_per_person_weekend;
        event.value_extra_hour_weekend = item.value_extra_hour_weekend;

        this.listEvents.push(event);
      })
    }

  }
});

app.mount('#app');