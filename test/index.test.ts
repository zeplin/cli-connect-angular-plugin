import Plugin from "../src";

describe("Connected Components Angular Plugin", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test("component.ts snippet creation", async () => {
        const plugin = new Plugin();

        const componentCode = await plugin.process(
            {
                path: "test/samples/component.ts",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("componentWithDecoratorInputs.ts snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/componentWithDecoratorInputs.ts",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("componentWithFileTemplate.ts snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/componentWithFileTemplate.ts",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("componentWithMultiSelectors.ts snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/componentWithMultiSelectors.ts",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("componentWithMultiSelectors.ts snippet creation", async () => {
        const processor = new Plugin();
        processor.init({ config: { useFullSnippet: true, useFullDescription: true } });

        const componentCode = await processor.process(
            {
                path: "test/samples/componentWithMultiSelectors.ts",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });
});
