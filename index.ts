import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

await new Command()
  .name("lan-spoof")
  .description("Fake a LAN server for Minecraft: Java Edition.")
  .version("v1.0.0")
  .option("-p, --port <port:number>", "The port number for the local server.", {
    default: 25565,
  })
  .option("--motd <motd:string>", "The message of the day.", {
    default: "A Minecraft Server",
  })
  .action(async ({ port, motd }) => {
    const localIP = Deno.networkInterfaces().filter(device => device.cidr.startsWith("192.168"))[0].address.split("/")[0];

    const addr: Deno.NetAddr = {
      transport: "udp",
      port: 4445,
      hostname: localIP
    };

    const socket = Deno.listenDatagram({
      port: 0,
      transport: "udp",
      hostname: "0.0.0.0",
    });

    const encoder = new TextEncoder();

    const packet = encoder.encode(`[MOTD]${motd}[/MOTD][AD]${port}[/AD]`);

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    while (true) {
      console.log("Sending packet")
      socket.send(packet, addr);
      await wait(1500);
    }
  })
  .parse();
