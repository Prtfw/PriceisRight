let markup = (basePx, people, pdt_category)=>{  
    var markups = [.05];        //initialzie flat markup for all products; used array for easy debugging/testing and easy operation to calculate total markup
    
    markups.push(people*.012); //calculate the person based markup, did not split into individual help function because it's online (keeping it here makes code more readable)
    
    markups.push(calculate_category_markup(pdt_category)) //calcuate the category markup and append to array
    
    console.log(basePx*(1+markups.reduce((a,b)=>{return a+b}))); //for debugging
    return basePx*(1+markups.reduce((a,b)=>{return a+b;})) //apply markup to base price
}


let calculate_category_markup = (pdt_category)=>{
    //declare state vars, use const to denote these are not expected to change, although can be updated
    const pharma=["pharmaceutical", "pharmaceuticals", "drugs", "drug", "meds", "medication"] //search array of keywords for similar terms to make code more user friendly/robust
    const food=["food", "groceries", "snack"]       //could integrate with Synonyms / NLP api down the road i.e. http://www.datamuse.com/api/
    const electronics=["electronics", "electronic"]
    
    const category_markup = {       //keep category markups so it's easily updated (in one place) should these numbers change later
        pharmaceutical: 0.075,
        food: 0.13,
        electronics: 0.02
    }
    //decided to use a if/else statement here because categories seems mutually exlusive (one category only); if assumption is not valid can switch to multiple if statements instead 
    if (pharma.indexOf(pdt_category) !== -1){
            return category_markup.pharmaceutical
        }else if (food.indexOf(pdt_category)!==-1){
            return category_markup.food
        }else if (electronics.indexOf(pdt_category)!==-1){
            return category_markup.electronics
        }else{return 0}
}

// process inputs first, then call the main function
try{
    const basePx = Number(process.argv[2].replace(/\$|,/gi,"")); //remove $ and , so we can convert to number for calculation
    const people = Number(process.argv[3].replace(/people|person/gi,"")); //convert to number for calculation
    const pdt_category =  (' ' || process.argv[4]).toLowerCase()  ;  //check for null input and change to lower case for string search later
    markup(basePx,people,pdt_category);     //calling the wrapper/main function with cleaned/processed parameters
}catch(e){
    console.log("unable to proceed with, please check inputs")   //for debugging
    return "unable to proceed, please check inputs."
}
