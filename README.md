# Lens FluxCD Extension

[![npm version](https://badge.fury.io/js/lens-extension-fluxcd.svg)](https://badge.fury.io/js/lens-extension-fluxcd)
![Linter](https://github.com/okaufmann/lens-extension-fluxcd/actions/workflows/eslint.yml/badge.svg)
![Release](https://github.com/okaufmann/lens-extension-fluxcd/actions/workflows/release.yml/badge.svg)

***NOTE ⚠️: This extension was refactored to make it work with [Freelens](https://github.com/freelensapp/freelens) as in K8S Lens extension API was deprecated.***

This extension integrates FluxCD support into [Freelens](https://github.com/freelensapp/freelens). [FluxCD](https://fluxcd.io/) v2.0.0 or higher is supported.

Features include:

- Comprehensive dashboard for FluxCD Application components and Events.
- Resource menus for reconciling, syncing, and automating FluxCD resources.
- Detailed views of FluxCD resource information.

## Screenshots

### Dashboard
![./docs/images/dashboard.png](./docs/images/dashboard.png)


## Install

To install open Freelens and go to Extensions (CTRL+SHIFT+E or CMD+SHIFT+E), and install `lens-extension-fluxcd`.

or

Click on the following link [lens://app/extensions/install/lens-extension-fluxcd](lens://app/extensions/install/lens-extension-fluxcd)

## Development

To install the extension for development

```sh
mkdir -p ~/.k8slens/extensions
git clone https://github.com/okaufmann/lens-extension-fluxcd.git
ln -s $(pwd) ~/.k8slens/extensions/lens-extension-fluxcd
```

Or you can open the Extensions view in Lens and click "Install from URL..." and paste the following:

```
lens-extension-fluxcd
```

## Build

To build the extension you can use `make` or run the `npm` commands manually:

```sh
make build
```

OR

```sh
npm install
npm run build
```

If you want to watch for any source code changes and automatically rebuild the extension you can use:

```sh
npm run start
```

## Test

Open the Lens application and navigate to a cluster. You should see "FluxCD" dashboard in a cluster menu.

## Uninstall

```sh
rm ~/.k8slens/extensions/lens-extension-fluxcd
```

Restart Lens application.
