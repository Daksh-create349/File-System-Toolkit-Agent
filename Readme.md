# 🧠 Filesystem AI Agent
### LangChain + Ollama + TypeScript

This project is a **local AI-powered filesystem agent** that translates natural language into actual file operations. Built with LangChain and Ollama, it allows you to manage files using plain English while keeping everything securely contained within a local `workspace` directory.



---

## 🚀 Features

The agent is equipped with several tools to manage your local environment:

* 📁 **Create files:** Generate new documents on the fly.
* ✍️ **Write content:** Populate files with specific data or generated text.
* 📖 **Read content:** Have the AI inspect and summarize existing files.
* 📂 **List files:** Get an overview of your current workspace.
* 🗑 **Delete files:** Clean up the workspace via command.

> **Security Note:** All operations are strictly restricted to the `workspace` folder to prevent accidental modifications to your system files.

---

## 🛠 Tech Stack

* **Runtime:** Node.js (v18+)
* **Language:** TypeScript
* **Orchestration:** LangChain
* **Brain:** Ollama (Local LLM)
* **Validation:** Zod (Schema-based tool definitions)

---

## 📦 Prerequisites

Ensure you have the following installed:
1.  **Node.js v18+**
2.  **Ollama:** [Download here](https://ollama.com/download)

---

## ⚙️ Installation & Setup

Follow these steps to get your agent up and running from scratch.

### 1. Create Project Folder
```bash
mkdir filesystem-ai-agent
cd filesystem-ai-agent
2. Initialize Node Project
Bash
npm init -y
3. Install Dependencies
Bash
# Core dependencies
npm install langchain @langchain/core @langchain/ollama zod dotenv

# Development dependencies
npm install -D typescript tsx @types/node
4. Setup Ollama Model
Pull the model to your local machine:

Bash
ollama pull qwen3:4b
Verify the installation:

Bash
ollama list
# You should see qwen3:4b in the list
▶️ Running the Agent
Launch the interactive CLI using tsx:

Bash
npx tsx index.ts
💬 Example Commands
Once the agent is running, you can interact with it naturally:

"Create a file called notes.txt and write Hello World"

"List all files in my workspace"

"Read the contents of notes.txt"

"Delete notes.txt"

To shut down the agent, simply type: exit

📁 Project Structure
Plaintext
filesystem-ai-agent/
│
├── index.ts           # Main agent logic and tool definitions
├── package.json       # Project dependencies and metadata
├── node_modules/      # Installed packages
└── workspace/         # The "sandbox" for all file operations