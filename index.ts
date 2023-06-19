const addr: Deno.NetAddr = {
  transport: "udp",
  port: 4445,
  hostname: "224.0.2.60",
};

const socket = Deno.listenDatagram({
  port: 0,
  transport: "udp",
  hostname: "0.0.0.0",
});

const encoder = new TextEncoder();

function data(motd: string, port: number): Uint8Array {
  const packet = `[MOTD]${motd}[/MOTD][AD]${port}[/AD]`;
  return encoder.encode(packet);
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

while (true) {
  socket.send(data("Hey!", 25565), addr);
  await wait(1000);
}
