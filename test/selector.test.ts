// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { parseSelector } from "../src/util";

const ELEMENT = "element";
const ATTR = "attr";
const VALUE = "value";
const CLASS_1 = "class1";
const CLASS_2 = "class2";

const ONLY_ELEMENT = `${ELEMENT}`;
const ONLY_ATTRIBUTE = `[${ATTR}]`;
const ONLY_ATTRIBUTE_VALUE = `[${ATTR}=${VALUE}]`;
const ONLY_CLASS = `.${CLASS_1}`;
const ONLY_MULTI_CLASS = `.${CLASS_1}.${CLASS_2}`;

const ELEMENT_CLASS = `${ELEMENT}.${CLASS_1}`;
const ELEMENT_MULTI_CLASS = `${ELEMENT}.${CLASS_1}.${CLASS_2}`;
const ELEMENT_ATTRIBUTE = `${ELEMENT}[${ATTR}]`;
const ELEMENT_CLASS_ATTRIBUTE = `${ELEMENT_CLASS}[${ATTR}]`;
const ELEMENT_MULTI_CLASS_ATTRIBUTE = `${ELEMENT_MULTI_CLASS}[${ATTR}]`;
const ELEMENT_CLASS_ATTRIBUTE_VALUE = `${ELEMENT_CLASS}[${ATTR}=${VALUE}]`;
const ELEMENT_MULTI_CLASS_ATTRIBUTE_VALUE = `${ELEMENT_MULTI_CLASS}[${ATTR}=${VALUE}]`;

const CLASS_ATTRIBUTE = `${ONLY_CLASS}[${ATTR}]`;
const MULTI_CLASS_ATTRIBUTE = `${ONLY_MULTI_CLASS}[${ATTR}]`;
const CLASS_ATTRIBUTE_VALUE = `${ONLY_CLASS}[${ATTR}=${VALUE}]`;
const MULTI_CLASS_ATTRIBUTE_VALUE = `${ONLY_MULTI_CLASS}[${ATTR}=${VALUE}]`;

const NOT_ELEMENT_MULTI_CLASS_ATTRIBUTE_VALUE = `:not(${ELEMENT_MULTI_CLASS_ATTRIBUTE_VALUE}])`;
const NOT_MULTI_CLASS_ATTRIBUTE_VALUE = `:not(${MULTI_CLASS_ATTRIBUTE_VALUE}])`;
const NOT_ONLY_ATTRIBUTE_VALUE = `:not(${ONLY_ATTRIBUTE_VALUE}])`;

describe("Parse selector utility", () => {
    it("should parse only the element name", () => {
        const selector = parseSelector(ONLY_ELEMENT);

        if (selector) {
            expect(selector.raw).toBe(ONLY_ELEMENT);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBe(ELEMENT);
            expect(selector.cls).toStrictEqual([]);
            expect(selector.attribute).toBeUndefined();
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse only attribute", () => {
        const selector = parseSelector(ONLY_ATTRIBUTE);

        if (selector) {
            expect(selector.raw).toBe(ONLY_ATTRIBUTE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse only attribute value", () => {
        const selector = parseSelector(ONLY_ATTRIBUTE_VALUE);

        if (selector) {
            expect(selector.raw).toBe(ONLY_ATTRIBUTE_VALUE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBe(VALUE);
        }
    });

    it("should parse only class", () => {
        const selector = parseSelector(ONLY_CLASS);

        if (selector) {
            expect(selector.raw).toBe(ONLY_CLASS);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([CLASS_1]);
            expect(selector.attribute).toBeUndefined();
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse only multi class", () => {
        const selector = parseSelector(ONLY_MULTI_CLASS);

        if (selector) {
            expect(selector.raw).toBe(ONLY_MULTI_CLASS);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([CLASS_1, CLASS_2]);
            expect(selector.attribute).toBeUndefined();
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse element and class", () => {
        const selector = parseSelector(ELEMENT_CLASS);

        if (selector) {
            expect(selector.raw).toBe(ELEMENT_CLASS);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBe(ELEMENT);
            expect(selector.cls).toStrictEqual([CLASS_1]);
            expect(selector.attribute).toBeUndefined();
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse element, class, attr", () => {
        const selector = parseSelector(ELEMENT_CLASS_ATTRIBUTE);

        if (selector) {
            expect(selector.raw).toBe(ELEMENT_CLASS_ATTRIBUTE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBe(ELEMENT);
            expect(selector.cls).toStrictEqual([CLASS_1]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse element, class, attr, value", () => {
        const selector = parseSelector(ELEMENT_CLASS_ATTRIBUTE_VALUE);

        if (selector) {
            expect(selector.raw).toBe(ELEMENT_CLASS_ATTRIBUTE_VALUE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBe(ELEMENT);
            expect(selector.cls).toStrictEqual([CLASS_1]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBe(VALUE);
        }
    });

    it("should parse element and attribute", () => {
        const selector = parseSelector(ELEMENT_ATTRIBUTE);

        if (selector) {
            expect(selector.raw).toBe(ELEMENT_ATTRIBUTE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBe(ELEMENT);
            expect(selector.cls).toStrictEqual([]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse element, multi class, attr", () => {
        const selector = parseSelector(ELEMENT_MULTI_CLASS_ATTRIBUTE);

        if (selector) {
            expect(selector.raw).toBe(ELEMENT_MULTI_CLASS_ATTRIBUTE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBe(ELEMENT);
            expect(selector.cls).toStrictEqual([CLASS_1, CLASS_2]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse element, multi class, attr, value", () => {
        const selector = parseSelector(ELEMENT_MULTI_CLASS_ATTRIBUTE_VALUE);

        if (selector) {
            expect(selector.raw).toBe(ELEMENT_MULTI_CLASS_ATTRIBUTE_VALUE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBe(ELEMENT);
            expect(selector.cls).toStrictEqual([CLASS_1, CLASS_2]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBe(VALUE);
        }
    });

    it("should parse class and attr", () => {
        const selector = parseSelector(CLASS_ATTRIBUTE);

        if (selector) {
            expect(selector.raw).toBe(CLASS_ATTRIBUTE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([CLASS_1]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse multi class and attr", () => {
        const selector = parseSelector(MULTI_CLASS_ATTRIBUTE);

        if (selector) {
            expect(selector.raw).toBe(MULTI_CLASS_ATTRIBUTE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([CLASS_1, CLASS_2]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBeUndefined();
        }
    });

    it("should parse class, attr, value", () => {
        const selector = parseSelector(CLASS_ATTRIBUTE_VALUE);

        if (selector) {
            expect(selector.raw).toBe(CLASS_ATTRIBUTE_VALUE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([CLASS_1]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBe(VALUE);
        }
    });

    it("should parse multi class, attr, value", () => {
        const selector = parseSelector(MULTI_CLASS_ATTRIBUTE_VALUE);

        if (selector) {
            expect(selector.raw).toBe(MULTI_CLASS_ATTRIBUTE_VALUE);
            expect(selector.negative).toBeFalsy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([CLASS_1, CLASS_2]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBe(VALUE);
        }
    });

    it("should parse not(element, multi class, attr, value)", () => {
        const selector = parseSelector(NOT_ELEMENT_MULTI_CLASS_ATTRIBUTE_VALUE);

        if (selector) {
            expect(selector.raw).toBe(ELEMENT_MULTI_CLASS_ATTRIBUTE_VALUE);
            expect(selector.negative).toBeTruthy();
            expect(selector.element).toBe(ELEMENT);
            expect(selector.cls).toStrictEqual([CLASS_1, CLASS_2]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBe(VALUE);
        }
    });

    it("should parse not(multi class, attr, value)", () => {
        const selector = parseSelector(NOT_MULTI_CLASS_ATTRIBUTE_VALUE);

        if (selector) {
            expect(selector.raw).toBe(MULTI_CLASS_ATTRIBUTE_VALUE);
            expect(selector.negative).toBeTruthy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([CLASS_1, CLASS_2]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBe(VALUE);
        }
    });

    it("should parse not(attr, value)", () => {
        const selector = parseSelector(NOT_ONLY_ATTRIBUTE_VALUE);

        if (selector) {
            expect(selector.raw).toBe(ONLY_ATTRIBUTE_VALUE);
            expect(selector.negative).toBeTruthy();
            expect(selector.element).toBeUndefined();
            expect(selector.cls).toStrictEqual([]);
            expect(selector.attribute).toBe(ATTR);
            expect(selector.value).toBe(VALUE);
        }
    });
});