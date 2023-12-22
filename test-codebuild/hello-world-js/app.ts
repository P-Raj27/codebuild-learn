// index.ts
import { Handler } from "aws-lambda";
import { exec } from "child_process";

const handler: Handler = async (event, context) => {
  const num1 = 5;
  const num2 = 10;

  const pythonScriptPath = "/python-layer/function.py"; // Adjust the path based on your setup

  return new Promise((resolve, reject) => {
    // Use `child_process` to execute the Python script
    exec(
      `python ${pythonScriptPath} ${num1} ${num2}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject(error.message);
          return;
        }

        if (stderr) {
          console.error(`Error: ${stderr}`);
          reject(stderr);
          return;
        }

        const result = parseFloat(stdout.trim());
        console.log(`Results: ${result}`);
        resolve(result);
        console.log("Executed Successfully");
      }
    );
  });
};

export { handler };
