import path from "path";
import pug from "pug";
import { readFile } from "fs-extra";
import { AngularDependencies, ComponentDep } from "@compodoc/compodoc";
import {
    ConnectPlugin, ComponentConfig, ComponentData, PrismLang, PluginContext
} from "@zeplin/cli";
import { Selector, parseSelector, ngContentExists } from "./util";

interface Component {
    name: string;
    selectors: Selector[];
    description: string;
    rawDescription: string;
    inputs: Input[];
    _extends?: string;
    _implements?: string[];
    hasChildren: boolean;
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
    generateSnippet: pug.compileTemplate = pug.compileFile(path.join(__dirname, "template/snippet-summary.pug"));
    generateDescription: pug.compileTemplate = pug.compileFile(path.join(__dirname, "template/description-summary.pug"));

    init(context: PluginContext): Promise<void> {
        if (context.config) {
            const { useFullDescription, useFullSnippet } = context.config;

            if (useFullSnippet) {
                this.generateSnippet = pug.compileFile(path.join(__dirname, "template/snippet-full.pug"));
            }
            if (useFullDescription) {
                this.generateDescription = pug.compileFile(path.join(__dirname, "template/description-full.pug"));
            }
        }

        return Promise.resolve();
    }

    async process(context: ComponentConfig): Promise<ComponentData> {
        const angularDependencies = new AngularDependencies(
            [path.resolve(context.path)],
            { tsconfigDirectory: ".", silent: true }
        );

        const rawComponents = angularDependencies.getDependencies().components || [];

        const components = await Promise.all(this.processComponents(rawComponents));

        const snippet = this.generateSnippet({ components });
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

    private processComponents(rawComponents: ComponentDep[]): Promise<Component>[] {
        return rawComponents.map(async rawComponent => {
            const {
                file,
                name,
                description,
                rawdescription: rawDescription,
                selector,
                inputsClass,
                propertiesClass,
                extends: _extends,
                implements: _implements,
                inputs: rawInputs,
                template,
                templateUrl
            } = rawComponent;

            let hasChildren = false;

            if (template && template.length > 0) {
                hasChildren = ngContentExists(template);
            } else if (templateUrl && templateUrl.length > 0 && templateUrl[0].length > 0) {
                const fileContent = await readFile(path.join(path.dirname(file), templateUrl[0]));
                hasChildren = ngContentExists(fileContent.toString());
            }

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
                _implements,
                hasChildren
            };
        });
    }
}
