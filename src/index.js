var basePx = Number(process.argv[2].replace(/\$|,/gi,"")); //remove $ and , so we can convert to number for calculation
var people = Number(process.argv[3].replace(/people/gi,"")); //convert to number for calculation
var pdt_category = typeof process.argv[4] === undefined ? "" :  process.argv[4].toLowerCase(); //check for null input and change to lower case for string search later


const markup = (basePx, people, pdt_category)=>{  
    var markups = [.05];        //initialzie flat markup for all products; used array for easy debugging/testing and easy operation to calculate total markup
    
    //declare state vars, use const to denote these are not expected to change, although can be updated
    const pharma=["pharmaceutical", "pharmaceuticals", "drugs", "drug", "meds", "medication"] //search array of keywords for similar terms to make code more user friendly/robust
    const food=["food", "groceries", "snack"]       //could integrate with Synonyms / NLP api down the road i.e. http://www.datamuse.com/api/
    const electronics=["electronics", "electronic"]
    
    const category_markup = {       //keep category markups so it's easily updated (in one place) should these markups change later
        pharmaceutical: 0.075,
        food: 0.13,
        electronics: 0.02
    }

    markups.push(people*.012); //calculate the person based markup, did not split into individual help function because it's online (keeping it here makes code more readable)
    
    //decided to use a if/else statement here because categories seems mutually exlusive (one category only); if assumption is false can switch to multiple if statements instead 
    if (pharma.indexOf(pdt_category) !== -1){
        markups.push(category_markup.pharmaceutical)
    }else if (food.indexOf(pdt_category)!==-1){
        markups.push(category_markup.food)
    }else if (electronics.indexOf(pdt_category)!==-1){
        markups.push(category_markup.electronics)
    }
    
    // console.log(basePx, markups)
    // console.log(basePx*(1+markups.reduce((a,b)=>{return a+b;})))

    return basePx*(1+markups.reduce((a,b)=>{return a+b;}))
}

// markup(1, 5, "meds")

// console.log(process.argv,process.argv[2],basePx);
markup(basePx,people,pdt_category);
