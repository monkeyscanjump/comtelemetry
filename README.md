# Comtelemetry Project

## Introduction

Comtelemetry is a comprehensive telemetry monitoring system designed to track and visualize various metrics and statistics for a distributed network. The project integrates both backend and frontend components to provide real-time data updates and interactive visualizations. The backend is responsible for data collection and processing, while the frontend offers a user-friendly interface for data presentation and interaction.

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

4. **Make sure you have at least one commune key imported**

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