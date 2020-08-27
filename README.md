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

Zeplin CLI Angular Plugin uses a fork of [Compodoc](https://github.com/compodoc/compodoc) to analyze and collect information from Angular components.

### Configuration

If necessary, Zeplin CLI Angular Plugin can generate more detailed snippets and descriptions. Update your [components configuration file](./docs/cli.componentconfigfile.plugins.md) to add the properties you need.

| Property             | Description                                                                  |
|----------------------|------------------------------------------------------------------------------|
| `useFullSnippet`     | Generates a distinct snippet for all combinations of the component selectors |
| `useFullDescription` | Generates descriptions with implemented interface names                      |
| `snippetPath`        | Uses a custom pub snippet template                                           |
| `descriptionPath`    | Uses a custom pub description template                                       |

Here's a sample configuration file (`.zeplin/components.json`):

```json
{
    ...
    "plugins" : [{
        "name": "@zeplin/cli-connect-angular-plugin",
        "config": {
            "useFullSnippet": true,
            "useFullDescription": true,
            "template": "src/zeplin/template/base.pug"
        }
    }],
    ...
}
```

☝️ _Note that after adding the plugin to the configuration file, you don't need to pass it as the `-p` argument to the `connect` command—running `zeplin connect` should be enough._

## About Connected Components

[Connected Components](https://blog.zeplin.io/introducing-connected-components-components-in-design-and-code-in-harmony-aa894ed5bd95) in Zeplin lets you access components in your codebase directly on designs in Zeplin, with links to Storybook, GitHub and any other source of documentation based on your workflow. 🧩

[Zeplin CLI](https://github.com/zeplin/cli) uses plugins like this one to analyze component source code and publishes a high-level overview to be displayed in Zeplin.
