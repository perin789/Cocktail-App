// declaring a component and storing it in the variable gameTrackerComponent
// This component is using the template and props options
const searchHistoryComponent = {
    template: ` <div>
                    <div class="row">
                        <p>
                            <ul v-for="drink in searchHistory" class="list-group">
                                <li class="darkbgbtn" >
                                    <button @click="fetchCocktail(drink.cocktail.idDrink)" class="darkbg">
                                        {{drink.cocktail.strDrink}} 
                                    </button>
                                    | {{drink.time}}
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>`,
    props: ['searchHistory', 'fetchCocktail'],
};

const cocktails = new Vue({
    el: '#cocktails',
    data: {
        appName: 'Cocktail Bar',
        searchWord: '',
        isSearch: '',
        isFetch: '',
        exist: true,
        cocktailId: '',
        cocktail : {},
        listOfCocktails: [],
        searchHistory: [],
    },
    computed: {
        results: function () {
            if(this.listOfCocktails != null){
                return this.listOfCocktails.length;
            }
            else{
                this.exist = false;
                return 0;
            } 
        },
    },
    methods: {
        searchCocktail: async function () {
            const response = await axios.get(`http://localhost:8888/api/search/`+this.searchWord);
            this.listOfCocktails = response.data;
            // if(this.listOfCocktails == null){
            //      this.searchWord = '';
            //      this.isSearch = '';
            // }
            
            this.isSearch = true;
            
            
    
            
        },
        fetchCocktail: async function (id) {
            this.cocktailId = id; 
            const response = await axios.post(`http://localhost:8888/api/fetch`, {
                cocktailId : this.cocktailId
            });
            this.cocktail = response.data;
            this.isFetch = true;
            this.isSearch ='';
        },
        trackCocktail: function () {
            // create a new date and time string formatted to local time
            const now = new Date().toLocaleString('en-US');
            const date = now.split(',');
            // push game data that we want to add to the history
            if(this.searchHistory.length === 0){
                this.searchHistory.push({
                    cocktail: this.cocktail,
                    time: date[0]
                });
            }
            else{
                let found = false;
                this.searchHistory.map(history => {
                    if(history.cocktail.idDrink == this.cocktail.idDrink){
                        found = true;
                    }
                });
                if (!found) {
                    this.searchHistory.push({
                        cocktail: this.cocktail,
                        time: date[0]
                    });
                }
            }
            
        },
        searchAgain: function () {
            // the trackGame() function is called from the clear() function
            // it tracks some information before we reset the game data
            if(this.exist)
                this.trackCocktail();

            this.cocktail = {};
            this.listOfCocktails = [];
            this.searchWord = '';
            this.cocktailId = '';
            this.isSearch = '';
            this.isFetch = '';
            this.exist = true;
        },
    },
    components: {
        // the key (left side) is the the components name
        // the value (right side) is the component itself as declared at the top
        'tracker-component': searchHistoryComponent,
    },
});