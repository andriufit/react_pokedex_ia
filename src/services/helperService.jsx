function formatPokedexPosition(order){

    let result = "";

    if(order < 10){
        result = "000" + (String(order))
    } else if(order < 100){
        result = "00" + (String(order))
    } else if(order < 1000) {
        result = "0" + (String(order))
    } else {
        result = order;
    }

    return result;
}


function formatMovePower(power){
    if(power == null){
        power=0;
    }
    return power;
    
}


export {formatPokedexPosition, formatMovePower}
