var markup = (basePx, people, pdt_category)=>{  
    var markups = [.05];        //flat markup for all products
    var pharma=["pharmaceutical", "pharmaceuticals", "drugs", "drug", "meds", "medication"]
    var food=["food"]
    var electronics=["electronics", "electronic"]
    var category_markup = {
        pharmaceutical: 0.075,
        food: 0.13,
        electronics: 0.02
    }

    markups.push(people*.012);
    
    //decided to use a if statement here because categories seems mutually exlusive (one category only)
    if (pharma.indexOf(pdt_category) !== -1){
        markups.push(category_markup.pharmaceutical)
    }else if (food.indexOf(pdt_category)!==-1){
        markups.push(category_markup.food)
    }else if (electronics.indexOf(pdt_category)!==-1){
        markups.push(category_markup.electronics)
    }
    console.log(markups)
    console.log(basePx*(1+markups.reduce((a,b)=>{return a+b;})))

    return basePx*(1+markups.reduce((a,b)=>{return a+b;}))
}

markup(1, 5, "electronics")