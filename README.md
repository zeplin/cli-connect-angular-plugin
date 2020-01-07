# Zeplin CLI Angular Plugin

[Zeplin CLI](https://github.com/zeplin/cli) plugin to generate descriptions and code snippets for Angular components.

## Installation

Install plugin using npm.

```sh
npm install -g @zeplin/cli-connect-angular-plugin
```

## Usage

Run CLI `connect` command using the plugin.

```sh
zeplin connect -p @zeplin/cli-connect-angular-plugin
```

### Plugin Configuration

The plugin can generate more detailed snippets and descriptions. Use [the components configuration file](./docs/cli.componentconfigfile.plugins.md) add the plugin configuration shown as below.

- useFullSnippet: Generates a distinct snippet for all combinations of the component selectors
- useFullDescriptions: Generated descriptions will show implemented interface names

.zeplin/components.json
```json
{
    ...
    "plugins" : [{
        "name": "@zeplin/cli-connect-angular-plugin",
        "config": {
            "useFullSnippet": true,
            "useFullDescription": true,
        }
    }],
    ...
}
```

After adding plugin configuration there is no need to add `-p` flag when running CLI `connect` command.

```sh
zeplin connect
```

## Dependencies

We use a forked version of [Compodoc](https://github.com/compodoc/compodoc) to gather details about Angular components.

## About Connected Components

[Connected Components](https://blog.zeplin.io/introducing-connected-components-components-in-design-and-code-in-harmony-aa894ed5bd95) in Zeplin lets you access components in your codebase directly on designs in Zeplin, with links to Storybook, GitHub and any other source of documentation based on your workflow. 🧩

[Zeplin CLI](https://github.com/zeplin/cli) uses plugins like this one to analyze component source code and publishes a high-level overview to be displayed in Zeplin.
