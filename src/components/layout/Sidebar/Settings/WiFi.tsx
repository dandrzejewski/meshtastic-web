import React from 'react';

import { useForm, useWatch } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';

import { connection } from '@core/connection';
import { useAppSelector } from '@hooks/useAppSelector';
import { Checkbox, IconButton, Input } from '@meshtastic/components';
import type { Protobuf } from '@meshtastic/meshtasticjs';

export const WiFi = (): JSX.Element => {
  const preferences = useAppSelector(
    (state) => state.meshtastic.radio.preferences,
  );
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, formState, reset, control } =
    useForm<Protobuf.RadioConfig_UserPreferences>({
      defaultValues: preferences,
    });

  const watchWifiApMode = useWatch({
    control,
    name: 'wifiApMode',
    defaultValue: false,
  });

  const watchMQTTDisabled = useWatch({
    control,
    name: 'mqttDisabled',
    defaultValue: false,
  });

  React.useEffect(() => {
    reset(preferences);
  }, [reset, preferences]);

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    void connection.setPreferences(data, async () => {
      reset({ ...data });
      setLoading(false);
      await Promise.resolve();
    });
  });
  return (
    <>
      <form className="space-y-2" onSubmit={onSubmit}>
        <Checkbox label="Enable WiFi AP" {...register('wifiApMode')} />
        <Input
          label="WiFi SSID"
          disabled={watchWifiApMode}
          {...register('wifiSsid')}
        />
        <Input
          type="password"
          autoComplete="off"
          label="WiFi PSK"
          disabled={watchWifiApMode}
          {...register('wifiPassword')}
        />
        <Checkbox label="Disable MQTT" {...register('mqttDisabled')} />
        <Input
          label="MQTT Server Address"
          disabled={watchMQTTDisabled}
          {...register('mqttServer')}
        />
        <Input
          label="MQTT Username"
          disabled={watchMQTTDisabled}
          {...register('mqttUsername')}
        />
        <Input
          label="MQTT Password"
          type="password"
          autoComplete="off"
          disabled={watchMQTTDisabled}
          {...register('mqttPassword')}
        />
      </form>
      <div className="flex w-full bg-white dark:bg-secondaryDark">
        <div className="ml-auto p-2">
          <IconButton
            disabled={!formState.isDirty}
            onClick={async (): Promise<void> => {
              await onSubmit();
            }}
            icon={<FiSave />}
          />
        </div>
      </div>
    </>
  );
};