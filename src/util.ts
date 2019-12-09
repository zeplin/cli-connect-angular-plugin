// eslint-disable-next-line max-len
const SELECTOR_PATTERN = /^(?<not>:not\()?(?<raw>(?<element>[\w-:]+)?(?<cls>\.[\w-:\\.]+)?(?:\[(?<attribute>[\w-]+)(?:=?(?<value>[\w ]+)?\]))?)?(\))?/;

export interface Selector {
    raw: string;
    negative: boolean;
    element?: string;
    cls?: string[];
    attribute?: string;
    value?: string;
}

export function parseSelector(selector: string): Selector | null {
    const match = SELECTOR_PATTERN.exec(selector);

    if (match && match.groups) {
        const {
            raw,
            not,
            cls,
            element,
            attribute,
            value
        } = match.groups;

        return {
            raw,
            element,
            attribute,
            value,
            cls: cls ? cls.split(".") : [],
            negative: !!not
        };
    }

    return null;
}

export function ngContentExists(content: string): boolean {
    return /<ng-content> *\n* *<\/ng-content>/.test(content);
}