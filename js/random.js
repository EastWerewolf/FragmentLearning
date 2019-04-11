const rand = (function(){
    let seed = new Date().getTime();
    function rnd(){
        seed = (seed*9301+49297)%233280;
        return seed/(233280.0)
    }
    return function rand(number) {
        return Math.ceil(rnd()*number)
    }
})();
console.log(rand(0),rand(100),rand(100));
