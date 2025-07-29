import { parentPort } from "worker_threads"

let count = 0;
  for(let i = 0;i<=200_000_000_000;i++){
    count++;
  }

  parentPort.postMessage(count);