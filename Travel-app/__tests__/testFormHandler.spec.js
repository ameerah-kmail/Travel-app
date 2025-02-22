import { handleSubmit } from "../src/client/js/app.js";

describe("Testing the form submission function", () => {
    test("handleSubmit should be defined", () => {
        expect(handleSubmit).toBeDefined();
    });
});
