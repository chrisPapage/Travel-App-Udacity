import {updateUI} from "./eventListeners"

const regeneratorRuntime = require("regenerator-runtime");
test ("It should return true", async() => {
    expect(updateUI).toBeDefined();
});
test ("It should be a function", async() => {
    expect(typeof updateUI).toBe("function");
});