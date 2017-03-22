const expect = require("expect");
const mocha = require("mocha");

const markup = require('./../src/index.js');

describe('validate inputs', () => {
    it('return error message if inputs are invalid', () => {
        const args = [];
        const res = markup.validate_input(args);
        expect(res).toBe("unable to proceed, please check inputs.")
    })
    it('handle no cateogry', () => {
        const args = '$1, 0 people';
        const res = markup.validate_input(args);
        expect(res).toBeA('number')
    })
})


describe('calculate_category_markup', () => {
    it("return the right category", () => {
        var res = [] 
        res.push(markup.calculate_category_markup("meds"));
        res.push(markup.calculate_category_markup("food"));
        res.push(markup.calculate_category_markup("electronics"));

        expect(res).toEqual([0.075,0.13,0.02])
    })
    it("return the default of 0", () => {
        const res = markup.calculate_category_markup("foobar");
        expect(res).toBe(0)
    })
})

describe('end to end tests from examples', () => {
    it("1 - $1,299.99, 3 people, food", () => {
        var arg ='$1,299.99, 3 people, food'
        var res = markup.validate_input(arg)
        expect(res.toFixed(2)).toEqual(1591.58)
    })
    it("2 - $5,432.00, 1 person, drugs", () => {
        var arg ='$5,432.00, 1 person, drugs'
        var res = markup.validate_input(arg)
        expect(res.toFixed(2)).toEqual(6199.81)
    })
    it("3 - $12,456.95, 4 people, books", () => {
        var arg ='$12,456.95, 4 people, books'
        var res = markup.validate_input(arg)
        expect(res.toFixed(2)).toEqual(13707.63)
    })

})