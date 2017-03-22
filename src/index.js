const markup = (basePx, people, pdt_category)=>{  
    
    basePx = basePx*1.05;
    
    var markups = [];        //initialzie flat markup for all products; used array for easy debugging/testing and easy operation to calculate total markup
    
    markups.push(people*.012); //calculate the person based markup, did not split into individual help function because it's online (keeping it here makes code more readable)
    
    markups.push(calculate_category_markup(pdt_category)) //calcuate the category markup and append to array
    
    // console.log(markups, basePx, Number(basePx*(1+markups.reduce((a,b)=>{return a+b})))); //for debugging
    return Number(basePx*(1+markups.reduce((a,b)=>{return a+b}))) //apply markup to base price
}


const calculate_category_markup = (pdt_category)=>{
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
const validate_input = (args)=>{
    try{
        args=args.split(", ")
        // console.log(40, process.argv, "\n" ,args[0],args[1],args[2])    //for debugging
        const basePx = Number(args[0].replace(/\$|,/gi,"")); //remove $ and , so we can convert to number for calculation
        const people = Number(args[1].replace(/people|person/gi,"")); //convert to number for calculation
        const pdt_category =  (args[2] ?  args[2] : ' ').toLowerCase() ;  //check for null input and change to lower case for string search later
        // console.log(45,basePx,people,pdt_category)      //for debugging
        return markup(basePx,people,pdt_category);     //calling the wrapper/main function with cleaned/processed parameters
    }catch(e){
        // console.log("unable to proceed with, please check inputs", e)   //for debugging
        return "unable to proceed, please check inputs."
    }
}


module.exports = {
   validate_input,
   markup,
   calculate_category_markup
}