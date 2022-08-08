import { IsBoolean, IsEnum, IsInt } from "class-validator";

import { Protobuf } from "@meshtastic/meshtasticjs";

export class SerialValidation implements Protobuf.ModuleConfig_SerialConfig {
  @IsBoolean()
  enabled: boolean;

  @IsBoolean()
  echo: boolean;

  @IsInt()
  rxd: number;

  @IsInt()
  txd: number;

  @IsEnum(Protobuf.ModuleConfig_SerialConfig_Serial_Baud)
  baud: Protobuf.ModuleConfig_SerialConfig_Serial_Baud;

  @IsInt()
  timeout: number;

  @IsEnum(Protobuf.ModuleConfig_SerialConfig_Serial_Mode)
  mode: Protobuf.ModuleConfig_SerialConfig_Serial_Mode;
}