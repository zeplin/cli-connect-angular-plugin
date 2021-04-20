/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "@compodoc/compodoc" {

    // We define minimal interface here for convenience
    // For other types look into the interfaces in @compodoc/compodoc/src/app/compiler/angular
    export interface Dep {
        id?: string;
        type?: string;
        ctype?: string;
        name: string;
    }

    export interface DepClass {
        name: string;
        type?: string;
        defaultValue?: any;
        optional: boolean;
        description: string;
    }

    export interface ComponentDep extends Dep {
        file: string;
        changeDetection: any;
        encapsulation: any;
        exportAs: Array<string>;
        host: any;
        inputs: Array<string>;
        outputs: Array<string>;
        providers: Array<any>;
        moduleId: string;
        selector: string;
        styleUrls: Array<string>;
        styleUrlsData: string;
        styles: Array<string>;
        stylesData: string;
        template: string;
        templateUrl: Array<string>;
        viewProviders: Array<any>;
        inputsClass: Array<DepClass>;
        outputsClass: Array<DepClass>;
        propertiesClass: Array<DepClass>;
        methodsClass: Array<DepClass>;

        entryComponents: Array<any>;

        hostBindings: Array<any>;
        hostListeners: Array<any>;

        description: string;
        rawdescription: string;
        sourceCode: string;
        exampleUrls: Array<string>;

        jsdoctags?: Array<string>;
        extends?: string;
        implements?: Array<string>;
    }

    export interface ParsedData {
        components: Array<ComponentDep>;
    }
}