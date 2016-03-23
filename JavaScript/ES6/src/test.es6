class Test {
    constructor(){
        this.name = 'tony';
    }

    sayHello(){
        console.log('hi , i am ' + this.name);
    }
}

module.exports = {
    Test : Test
};