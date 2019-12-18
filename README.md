# Zeplin CLI Connected Components - Angular Plugin

This plugin provides a processor to gather code snippets and descriptions from Angular components.

## Dependencies

We use a forked version of [Compodoc](https://github.com/compodoc/compodoc) to gather details about Angular components. It just exposes some small parts of the repository be used as a library. 

## Usage

Install this package along with @zeplin/cli npm package

```
npm install -g @zeplin/cli @zeplin/cli-connect-angular-plugin
```

Execute connect command on Zeplin CLI using -p option to include the plugin into the connect operation.

```
zeplin connect -p @zeplin/cli-connect-angular-plugin -f components.json
```
