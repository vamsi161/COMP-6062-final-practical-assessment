const app = Vue.createApp({
    data () {
        return {
            firstName :'vamsi',
            lastName : 'reddy',
            email: '',
            age: '',
            imageUrl: '',
            wether:{
                city:'London',
                province:'Ontario',
                country:'Canada',
                Temperature:'',
                Wind:'',
                Description:'',

            },
            word:{
                userWord: '',
                returnWord: '',
                phonetic: '',
                definition: '',
            }
        };
    
    },
created(){
    this.nextImage();
    this.getWeather();
    this.getWord();
},
computed:{

},
methods:{
    nextImage() {
        fetch('https://comp6062.liamstewart.ca/random-user-data')
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else
            {
               console.log("An Error Occured. Please try again");
            }
        })
        .then(data => {
            let userData = data.user_profile;
            this.firstName = userData.first_name;
            this.lastName = userData.last_name;
            this.email = userData.email;
            this.age = userData.age;
            this.imageUrl = userData.avatar_url;

        })
        .catch(error =>{
            console.log('Total failure');
        })
    },
    getWeather(){

        let weatherUrl = `https://comp6062.liamstewart.ca/weather-data?city=${this.wether.city}&province=${this.wether.province}&country=${this.wether.country}`
        fetch(weatherUrl)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else
            {
               console.log("An Error Occured. Please try again");
            }
        })
        .then(data=>{
            let weatherData = data.weather_data;
            this.wether.Temperature = weatherData.temperature;
            this.wether.Wind = weatherData.wind_speed;
            this.wether.Description = weatherData.weather_description;
        } )
        .catch(error =>{
            console.log('Total failure');
        })
    
    },
    getWord(){
        let wordUrl = `https://comp6062.liamstewart.ca/api/define?word=${this.word.userWord}`;
        fetch(wordUrl)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else
            {
               console.log("An Error Occured. Please try again");
            }
        })
        .then(data=>{
            let wordData = data;
            this.word.returnWord = wordData.word;
            this.word.phonetic = wordData.phonetic;
            this.word.definition = wordData.definition;
        } )
        .catch(error =>{
            console.log('Total failure');
        })
    }

}

},

);
app.mount('#app');