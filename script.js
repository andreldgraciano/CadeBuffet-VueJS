const app = Vue.createApp({
  data(){
    return{
      searchText: '',

      listBuffets: [],

      page: 'buffets'
    }
  },

  computed:{
    listResultBuffets(){
      if(this.searchText){
        // Procura pelos buffets
        return this.listBuffets.filter(contact => {
          return contact.brand_name.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }else{
        // Se nao encontrar, retorna todos os buffets
        return this.listBuffets;
      }
    }
  },

  async mounted() {
    this.listResultBuffets = await this.getBuffets();
    this.listResultEvents = await this.getEvents();
  },

  methods: {
    // changeData(){
    //   this.firstName = 'Fernando',
    //   this.lastName = 'Lucas',
    //   this.email = 'fernando.lucas@gmail.com',
    //   this.city = 'Caratinga',
    //   this.picture = 'https://randomuser.me/api/portraits/men/56.jpg'
    // },
    handleClick(BuffetId) {
      // Faça algo com o BuffetId clicado
      console.log('Você clicou em:', BuffetId);
      this.page = 'buffet'
    },

    async getBuffets(){
      let response = await fetch('http://localhost:3000/api/v1/buffets');

      // Exibindo os dados no console do navegador
      // console.log(response.json());

      // Armazenando os dados do json
      let data = await response.json();

      // Remover todos os items do array listBuffets
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

    async getEvents(){
      let response = await fetch('http://localhost:3000/api/v1/buffets');

      // Exibindo os dados no console do navegador
      // console.log(response.json());

      // Armazenando os dados do json
      let data = await response.json();

      // Remover todos os items do array listBuffets
      this.listBuffets = [];
      
      data.forEach(item =>{
        var buffet = new Object();

        buffet.id = item.id;
        buffet.brand_name = item.brand_name;
        buffet.description = item.description;

        this.listBuffets.push(buffet);
      })
    }
    // ,
    // removeContact(index){
    //   // console.log('Index do objeto selecionado: ' + index);

    //   // Excluindo um objeto do index selecionado
    //   this.listBuffets.splice(index, 1);
    // }
  }
});

// o método mount, fica monitorando e gerenciando o conteudo de app
// que criamos na index
app.mount('#app');