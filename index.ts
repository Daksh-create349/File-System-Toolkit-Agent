import "dotenv/config";
import { ChatOllama } from "@langchain/ollama";
import { createAgent } from "langchain";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import fs from "fs";
import path from "path";
import readline from "readline";

const model = new ChatOllama({
  model: "qwen3:4b",
  temperature: 0,
});

const baseDir = "./workspace";

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

const listFilesTool = tool(
  async () => {
    const files = fs.readdirSync(baseDir);
    if (files.length === 0) return "No files found.";
    return files.join("\n");
  },
  {
    name: "list_files",
    description: "List all files in the workspace directory",
  }
);

const readFileTool = tool(
  async ({ filename }) => {
    const filePath = path.join(baseDir, filename);
    if (!fs.existsSync(filePath)) return "File not found.";
    return fs.readFileSync(filePath, "utf-8");
  },
  {
    name: "read_file",
    description: "Read contents of a file",
    schema: z.object({
      filename: z.string(),
    }),
  }
);

const writeFileTool = tool(
  async ({ filename, content }) => {
    const filePath = path.join(baseDir, filename);
    fs.writeFileSync(filePath, content);
    return "File written successfully.";
  },
  {
    name: "write_file",
    description: "Write content to a file",
    schema: z.object({
      filename: z.string(),
      content: z.string(),
    }),
  }
);

const deleteFileTool = tool(
  async ({ filename }) => {
    const filePath = path.join(baseDir, filename);
    if (!fs.existsSync(filePath)) return "File not found.";
    fs.unlinkSync(filePath);
    return "File deleted successfully.";
  },
  {
    name: "delete_file",
    description: "Delete a file",
    schema: z.object({
      filename: z.string(),
    }),
  }
);

const agent = createAgent({
  model,
  tools: [listFilesTool, readFileTool, writeFileTool, deleteFileTool],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Filesystem AI Agent Started.");
console.log("Type your command or type 'exit' to quit.");

async function ask() {
  rl.question("\nYou: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    try {
      const response = await agent.invoke({
        messages: input,
      });

      console.log(
        "\nAgent:",
        response.messages[response.messages.length - 1].content
      );
    } catch (e) {
      console.log("Error:", e);
    }

    ask();
  });
}

ask();
