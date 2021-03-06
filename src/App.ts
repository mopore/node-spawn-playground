import * as cp from "child_process";

let counter = 0;

const child = cp.spawn("./external-command/sensor-json", {});
child.on("exit", code => {
    if (code){
        console.log(`External program exited with code: ${code}`);
    }
    else {
        console.log("Could not receive an exit code (may be killed by us?).");
    }
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
