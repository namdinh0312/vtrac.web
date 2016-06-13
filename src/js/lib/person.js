/**
 * Created by pc-namdinh on 01/06/2016.
 */
export default class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }

    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }
}