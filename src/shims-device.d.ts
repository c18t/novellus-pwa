declare interface Window {
  SetDeviceResult(uuid: string, data: string): void;
  ReceiveDeviceResult(uuid: string): string | null;

  Device_Alert(data: string): void;
  Device_Time(data: string): void;
}

declare interface Device {
  Alert(message: string): void;
  Time(): Promise<string>;
}