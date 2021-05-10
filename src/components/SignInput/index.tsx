import React from 'react';
import {Input, InputArea} from './styles';

interface SignInputProps {
  IconSvg: any;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  password?: boolean;
}

export default function SignInput({
  IconSvg,
  placeholder,
  value,
  onChangeText,
  password,
}: SignInputProps) {
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill="#268596" />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#268596"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  );
}
