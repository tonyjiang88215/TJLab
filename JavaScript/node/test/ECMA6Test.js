/**
 * Created by tonyjiang on 15/4/24.
 */
class Test{
    constructor(){
        this.name = "tj";
    }

}

class TestChild extends Test{
    constructor(){
        this.car = "benz";
        super();
    }
}

var a = new TestChild();
console.log(a);