# Comtelemetry Project

## Introduction

A web dashboard for Commune AI users that need module data from multiple machines, in a single point of failure Web GUI.
It gathers and displays data based on web API data from Comstats and Communex endpoints.

## Roadmap (time is relative)

- [x] Create project, backend and frontend.
- [x] (backend) Create in-memory database for Communex key path.
- [x] (frontend) Create GUI for data.
- [ ] Create subnet endpoint BK, display data FT.
- [ ] Create secure connection between apps, prepare for multiple BK to single FT (heartbeat).
- [ ] Create Polkadot wallet login, update UI with new permission-based logic.
- [ ] Create BETA version, prepare for production build, create development branch.
- [ ] Add timeline (databse) logic for FT, create graphs, automate process through UI interaction.
- [ ] Automate connection security and optional Wireguard.
- [ ] Find a way to save timeline data on Commune storage, based on logged-in wallet.
- [x] More to come!

## Prerequisites

### Installing Node Version Manager (NVM)

NVM (Node Version Manager) is a tool that allows you to manage multiple versions of Node.js on the same machine. To install NVM, follow these steps:

1. **Download and Install NVM:**
   More info: [NVM Github](https://github.com/nvm-sh/nvm).

   On macOS and Linux:
   ```sh
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
   ```

   On Windows, you can download the NVM installer from the [nvm-windows repository](https://github.com/coreybutler/nvm-windows/releases).

2. **Load NVM:**

   After installation, add the following lines to your `~/.bashrc`, `~/.zshrc`, or `~/.profile` file:
   ```sh
   export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
   ```

   Then, reload your shell:
   ```sh
   source ~/.bashrc
   ```

3. **Install and Use the Latest LTS Version of Node.js:**

   ```sh
   nvm install --lts
   nvm use --lts
   ```

### Installing Python and Pip

Python and Pip are required for certain dependencies and tools used in this project. To install Python and Pip, follow these steps:

1. **Download and Install Python:**

   Download the latest version of Python from the [official website](https://www.python.org/downloads/). The installer includes Pip by default.

2. **Verify Installation:**

   ```sh
   python --version
   pip --version
   ```

3. **Install Communex Package:**

   ```sh
   pip install communex
   ```

4. **Make sure you have at least one commune key imported/created**

## Project Setup

### Clone the Repository

```sh
git clone https://github.com/monkeyscanjump/comtelemetry.git
cd comtelemetry
```

### Install Dependencies

Ensure you are using the latest LTS version of Node.js:

```sh
nvm use --lts
```

Install the project dependencies:

```sh
npm install
```

## Running the Project

### Development Mode

Currently, the project can only be run in development mode. The build process is not fully functional and may fail.

To start the project in development mode:

```sh
npm run dev
```

### Building the Project

**Note:** The build process is currently not functional and may fail.

To attempt building the project:

```sh
npm run build
```

## Contributing

We welcome contributions to improve the project. Please fork the repository and submit pull requests with your changes.

## License

This project is licensed under the MIT License.