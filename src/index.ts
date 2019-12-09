import { ConnectPlugin, ComponentConfig, ComponentData, PrismLang } from "@zeplin/cli";
import { Selector, parseSelector } from "./selector";
import path from "path";
import pug from "pug";
import { AngularDependencies, ComponentDep } from "@compodoc/compodoc";

interface Component {
    name: string;
    selectors: Selector[];
    description: string;
    rawDescription: string;
    inputs: Input[];
    _extends?: string;
    _implements?: string[];
}

interface Input {
    name: string;
    type?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValue?: any;
    optional: boolean;
    description: string;
}

export default class implements ConnectPlugin {
    generateSnippet: pug.compileTemplate;
    generateDescription: pug.compileTemplate;

    constructor(opts?: { useFullDescription: boolean; useFullSnippet: boolean }) {
        this.generateSnippet = (opts && opts.useFullSnippet)
            ? pug.compileFile(path.join(__dirname, "template/snippet-full.pug"))
            : pug.compileFile(path.join(__dirname, "template/snippet-summary.pug"));

        this.generateDescription = (opts && opts.useFullDescription)
            ? pug.compileFile(path.join(__dirname, "template/description-full.pug"))
            : pug.compileFile(path.join(__dirname, "template/description-summary.pug"));
    }

    async process(context: ComponentConfig): Promise<ComponentData> {
        const angularDependencies = new AngularDependencies(
            [path.resolve(context.path)],
            { tsconfigDirectory: ".", silent: true }
        );

        const rawComponents = await angularDependencies.getDependencies().components || [];

        const components = this.processComponents(rawComponents);

        const snippet = this.generateSnippet({ components });
        // Const description = components.map(c => `#### ${c.name}\n${c.description}`).join("\n\n");
        const description = this.generateDescription({ components });

        const lang = PrismLang.Markup;

        return { description, snippet, lang };
    }

    supports(x: ComponentConfig): boolean {
        const filePath = x.path;

        return path.extname(filePath) === ".ts" &&
            filePath.lastIndexOf(".d.ts") === -1 &&
            filePath.lastIndexOf("spec.ts") === -1;
    }

    private processComponents(rawComponents: ComponentDep[]): Component[] {
        return rawComponents.map(rawComponent => {
            const {
                name,
                description,
                rawdescription: rawDescription,
                selector,
                inputsClass,
                propertiesClass,
                extends: _extends,
                implements: _implements,
                inputs: rawInputs
            } = rawComponent;

            const selectors: Selector[] = [];
            const inputs: Input[] = [];

            if (rawInputs) {
                rawInputs.forEach(input => {
                    const externalName = input.includes(":") ? input.split(":")[1].trim() : input.trim();
                    const internalName = input.includes(":") ? input.split(":")[0].trim() : input.trim();

                    let optional = true;
                    let type;
                    let defaultValue;
                    let desc = "";

                    const matchingProperty = propertiesClass.find(p => p.name === internalName);
                    if (matchingProperty) {
                        ({
                            type,
                            optional,
                            defaultValue,
                            description: desc
                        } = matchingProperty);
                    }

                    inputs.push({
                        name: externalName,
                        type,
                        optional,
                        defaultValue,
                        description: desc
                    });
                });
            }

            if (inputsClass) {
                inputsClass.forEach(i => inputs.push(i));
            }

            if (selector) {
                selector.replace(/\n/g, "")
                    .split(",")
                    .map(s => parseSelector(s.trim()))
                    .forEach(s => {
                        if (s) {
                            selectors.push(s);
                        }
                    });
            }

            return {
                name,
                selectors,
                description,
                rawDescription,
                inputs,
                _extends,
                _implements
            };
        });
    }
}
