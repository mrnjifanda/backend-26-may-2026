let a =  10;

console.log("1. A value is: " + a);

setTimeout(() => {
    a = 20;
    console.log("2. A value is: " + a);
}, 5000);

console.log("3. A value is: " + a);