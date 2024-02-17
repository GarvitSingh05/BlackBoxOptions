function calculateOptionPrices() {
    const strikePrice = parseFloat(document.getElementById("strikePrice").value);
    const spotPrice = parseFloat(document.getElementById("spotPrice").value);
    const riskFreeRate = parseFloat(document.getElementById("riskFreeRate").value) / 100;
    const historicalVolatility = parseFloat(document.getElementById("historicalVolatility").value) / 100;
    const timeToExpiration = parseFloat(document.getElementById("timeToExpiration").value) / 365; 

    if (isNaN(strikePrice) || isNaN(spotPrice) || isNaN(riskFreeRate) || isNaN(historicalVolatility) || isNaN(timeToExpiration)) {
        alert("Please enter valid numerical values for all input fields.");
        return;
    }

    console.log(strikePrice, spotPrice, riskFreeRate, historicalVolatility, timeToExpiration);

    const d1 = (((Math.log(spotPrice/strikePrice)) + ((riskFreeRate + ((historicalVolatility*historicalVolatility)/2))*timeToExpiration))/(historicalVolatility*Math.sqrt(timeToExpiration)));
    const d2 = (d1 - (historicalVolatility*(Math.sqrt(timeToExpiration))));

    console.log(d1, d2);

    const N1 = normDist(d1);
    const N2 = normDist(d2);

    console.log(N1, N2);

    const n1 = 1.00 - N1;
    const n2 = 1.00 - N2;

    console.log(n1, n2);
    
    const callOptionPrice = N1 * spotPrice - strikePrice * Math.exp(-riskFreeRate * timeToExpiration) * N2;
    const putOptionPrice = Math.exp(-riskFreeRate * timeToExpiration) * n2 * strikePrice - spotPrice * n1;


    console.log(callOptionPrice, putOptionPrice);

    document.getElementById("callOptionPrice").textContent = callOptionPrice;
    document.getElementById("putOptionPrice").textContent = putOptionPrice;
}

function normDist(x) { 
    const a1 = 0.48592; 
    const a2 = -1.14736; 
    const a3 = 2.52741; 
    const a4 = -1.45527; 
    const a5 = 4.256; 
    const A = 0.37711; 
    const s = (x < 0) ? -1 : 1; 
    x = Math.abs(x) / Math.sqrt(2.0); 
    const B = 1.0 / (1.0 + A * x); 
    const C = 1.0 - (((((a5 * B + a4) * B + a3) * B + a2) * B + a1) * B) * Math.exp(-x * x); 
    return 0.5 * (1.0 + s * C);
}