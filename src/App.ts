import * as cp from "child_process";

let counter = 0;

const child = cp.spawn("./external-command/sample-json", {});
child.on("exit", () => {
    console.log("Will disconnect external command...");
});
child.stdout.on("data", listener => {
    const data = listener.toString();
    const jsonData = JSON.parse(data);
    const timestamp = jsonData["reporting-persisting-timestamp"];
    console.log(`Data received, timestamp: ${timestamp}`);

    counter++;
    if (counter >= 5){
        console.log("Received enough data and will kill child process.");
        child.kill();
    }
});
console.log("Waiting for data from external command...");