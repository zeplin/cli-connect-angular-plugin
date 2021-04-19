import Plugin from "../src";
import { logger } from "./helper/logger";

describe("Connected Components Angular Plugin", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test("component.ts snippet creation", async () => {
        const plugin = new Plugin();

        const component = {
            path: "test/samples/component.ts",
            zeplinNames: []
        };

        await plugin.init({
            logger,
            components: [component],
            config: {
                tsConfigPath: "./tsconfig.test.json"
            }
        });

        const componentCode = await plugin.process(component);

        expect(componentCode).toMatchSnapshot();
    });

    test("componentWithDecoratorInputs.ts snippet creation", async () => {
        const processor = new Plugin();

        const component = {
            path: "test/samples/componentWithDecoratorInputs.ts",
            zeplinNames: []
        };

        await processor.init({
            logger,
            components: [component],
            config: {
                tsConfigPath: "./tsconfig.test.json"
            }
        });

        const componentCode = await processor.process(component);

        expect(componentCode).toMatchSnapshot();
    });

    test("componentWithFileTemplate.ts snippet creation", async () => {
        const processor = new Plugin();

        const component = {
            path: "test/samples/componentWithFileTemplate.ts",
            zeplinNames: []
        };

        await processor.init({
            logger,
            components: [component],
            config: {
                tsConfigPath: "./tsconfig.test.json"
            }
        });

        const componentCode = await processor.process(component);

        expect(componentCode).toMatchSnapshot();
    });

    test("componentWithMultiSelectors.ts snippet creation", async () => {
        const processor = new Plugin();

        const component = {
            path: "test/samples/componentWithMultiSelectors.ts",
            zeplinNames: []
        };

        await processor.init({
            logger,
            components: [component],
            config: {
                tsConfigPath: "./tsconfig.test.json"
            }
        });

        const componentCode = await processor.process(component);

        expect(componentCode).toMatchSnapshot();
    });

    test("component.ts full snippet, full description creation", async () => {
        const processor = new Plugin();

        const component = {
            path: "test/samples/component.ts",
            zeplinNames: []
        };

        await processor.init({
            config: {
                useFullSnippet: true,
                useFullDescription: true,
                tsConfigPath: "./tsconfig.test.json"
            },
            components: [component],
            logger
        });

        const componentCode = await processor.process(component);

        expect(componentCode).toMatchSnapshot();
    });

    test("componentWithMultiSelectors.ts full snippet, full description creation", async () => {
        const processor = new Plugin();
        const component = {
            path: "test/samples/componentWithMultiSelectors.ts",
            zeplinNames: []
        };

        await processor.init({
            config: {
                useFullSnippet: true,
                useFullDescription: true,
                tsConfigPath: "./tsconfig.test.json"
            },
            components: [component],
            logger
        });

        const componentCode = await processor.process(component);

        expect(componentCode).toMatchSnapshot();
    });
});
